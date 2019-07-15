---
title: Pure Components are an Anti-Pattern
date: '2019-07-08'
description: "Components should be black boxes and difficult to use incorrectly. React's PureComponent API opposes this by requiring parent components to know about the child component's code."
tags: ['react', 'render-performance']
---

I know some of you are already up in arms about this one, but hear me out. This post is less about `React.PureComponent` and more about API design, so there's a bit here for everyone.

This post was prompted by a discussion at work where I noted that inline function declarations in React render methods aren't actually a performance concern, and people should stop bringing it up in code reviews. I was confident about this advice, it was a couple days after I attempted to convert hundreds of inline functions in our app to class methods or memoized callbacks to test the theory that inline function declarations are slow, and I saw absolutely no difference in performance.

But, of course, my coworkers came ready to fight. Almost immediately, dozens of people came back to me saying that inline functions make `PureComponent`s ineffective and their components will start to re-render on every render cycle if they move back to using inline functions, and they're absolutely right. As someone who never really liked `PureComponent`s, this forced me to think about what exactly makes me uncomfortable about `PureComponent`s and what I think the improvements could be.

I want to start by laying out two things I feel are fundamental truths about API design and building generic UI components, specifically with regards to performance:

1. Well-written APIs are hard to use wrong, and shouldn't require being aware of implementation details
2. Well-written components have good performance by default

### `PureComponent` violates both of these principles {#pure-component-antipattern}

I think that these are pretty simple principles that generally don't seem to ruffle any feathers - components should be fast and easy to use. This isn't restricted to just React, either. While "component" has become a loaded term recently, a component could be an API endpoint, a database call, even just a single function call. Regardless of the scope of the "component," these philosophies should apply universally.

Upon a further examination, I figured out that this is the root of my distaste for `PureComponent`s - they violate _both_ of these principles. `PureComponent`s are very easy to use wrong, require understanding the implementation details of `PureComponent` (identity equality comparisons), and are only performant if you use them correctly (not passing object literals, array literals, or dynamic functions).

As a concrete example, take this component:

```jsx
class Input extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      value: props.defaultValue,
    };
  }

  onChange = evt => {
    this.props.onChange && this.props.onChange(evt.target.value);
    this.setState({ value: evt.target.value });
  };

  render() {
    return (
      <label>
        <input
          style={this.props.style}
          defaultValue={this.props.defaultValue}
          value={this.state.value}
          onChange={this.onChange}
        />
        <span>{this.props.label}</span>
      </label>
    );
  }
}
```

This is a very simple input component that allows the parent to apply styling, but automatically manages the input state, you could assume to allow validation or some other runtime code checks. But what happens if I use it like this?

```jsx
function Form() {
  return (
    <form>
      <Input
        defualtValue={18}
        label="Age"
        style={{ color: '#000', borderRadius: 4 }}
      />
    </form>
  );
}
```

In this example, because the `style` prop is an object literal generated in the render method, its identity is _never_ stable across renders. While in theory you're using `PureComponent` to prevent re-rendering the input when other components in the form change, in practice you've actually made this component less efficient. Now, it will render more often because `PureComponent` will always decide that the props are different, **and** the render cycle will be slower because `Input#shouldComponentUpdate` will get executed on every single render (if `shouldComponentUpdate` is unspecified it is skipped entirely).

As you can see, this is an incredibly easy way to slow your application's performance, despite ostensibly using all common best practices.

In React's early days `PureComponent` was a novel abstraction - one that was probably the right one for the time. It provided an out-of-the-box performance optimization that wasn't available anywhere else. However, as we've learned more about web performance and API design on the front end, the abstraction has started to show its age.

### Ok. Fine. But what's the alternative? {#modern-pure-component}

I'm so glad you asked! Before November 2018 the answer was an unpleasant one. It was effectively that component internals should be heavily memoized, make heavy use of `shouldComponentUpdate`, and hope for the best.

Today, with React hooks, we have an interesting new option. It's a principle I'm going to assign a made-up name to - _"inversion of control."_ Essentially, instead of making performance an implementation detail within a child, make the component naive and let the _parent_ decide how to manage performance. In the `Input` component above, we could either rewrite it as a function component or just swap `PureComponent` for `Component`, and then rewrite our form to look like this:

```jsx
function Form() {
  const input = useMemo(
    () => (
      <Input
        defaultValue={18}
        label="Age"
        style={{ color: '#000', borderRadius: 4 }}
      />
    ),
    []
  );
  return <form>{input}</form>;
}
```

With our new implementation, because the `input` memo has no dependencies in its dependency array, it shouldn't ever re-render due to a new prop from its parent. Instead, the inner `Input` component will only re-render when its contents are edited, triggering an internal state transition.

As a bonus, with just a simple switch from `PureComponent` to `Component`, our new `Input` satisfies both of the constraints we set out earlier in the post. It's difficult to use wrong (passing in object literals doesn't make the component slower), and it's performant by default (only re-renders when its internal state changes). More specifically, its usage requires absolutely no knowledge of how it's implemented - a drastic change from the `PureComponent` implementation.

### But Adam, isn't that the same as before? {#premature-optimization}

I get this argument a lot. What's the functional difference between memoizing in the parent versus the child? Should I memoize everything I render?

Honestly, those are both valid points which I'll answer in stack order.

> Should I memoize everything I render?

Nope. Only memoize once performance becomes an issue. Premature optimizations increase cognitive overhead of reading code without providing concrete benefit, and if you remember from our first post, all performance changes [should be data driven](/reframing-performance). Wait until performance gets slow, profile your app (post on that will be coming in the future), and figure out why it's slow. Maybe the answer is memoization, maybe it's not, but you won't know until you do some data collection.

> What's the functional difference between memoizing in the parent versus the child?

See above. Premature optimization is the bane of both performance and developer productivity. Memoizing in the child means you're _assuming_ that your component will be slow, when in reality your "optimization" could create a slower component than if you didn't optimize at all. Further, you're unknowingly making code decisions for whoever is using your component. Conversely, by hoisting that control to the parent you let the client take control of their performance and decide how and when to optimize.
