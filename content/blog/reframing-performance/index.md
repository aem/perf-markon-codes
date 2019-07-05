---
title: Reframing the Discussion on Web Performance
date: '2019-07-05'
description: 'Before talking about web performance we need to set some base understandings. Every site is different, performance is a moving target, and performance must be data-driven.'
tags: ['general', 'commentary']
---

I've been wanting to start writing again for a while, and as I move into a new job on a team whose sole mission is to improve performance for a half-a-million-user React app that comprises more than 5,000 React components, more than 12 megabytes of JavaScript, and queries more than 120 APIs to display the proper data to our users. This is a monumental challenge, once that a colleague and I have been working on for about 10 months, and I'm really excited to share what we've learned already, as well as the discoveries we're sure to make in the coming year and beyond.

Before we start talking about real technical problems, it feels prudent to set some ground rules. These are based off of what we've already learned over the last 10 months, and are important for framing every post I'll write on this blog.

## There are no silver bullets

This is, shockingly, one of the hardest points to convey with performance, and yet it might be the most critical. I'm sure you can't count the number of times you've heard "just code split," or "don't use inline arrow functions," or, "just use GraphQL," or... well... you get the point. The community _loves_ sharing these bits of common advice that should be incredibly nuanced, are much more complex than they sound, and can have wide-reaching implications for an organization. In order to enjoy this blog you will have to understand that every website is different, and no two sites have the same concerns, constraints, or goals.

https://twitter.com/amarkon88/status/1082363368361639937

This tweet apparently resonated with people quite well, including Dan Abramov (RIP my mentions), and it was 100 percent true. For every bit of advice you see someone touting on the Internet (including mine), take it with a grain of salt and examine it critically to see if it even applies to your application, let alone whether or not it will help.

## All changes should be data driven

For the love of all that is important in this world, please stop suggesting people make changes for performance if they're not a problem yet. It's really hard to build slow React applications today (unless, hypothetically, it's a 5,000 component monolith), so making performance changes for things that aren't slow only adds friction to your development cycle and stress to your team, likely without actually improving your site's speed.

Instead, measure performance, analyze, and react accordingly (pun 110% intended). You can never make informed, effective performance changes without knowing what you're trying to speed up. Use a service like NewRelic or SpeedCurve or any of the other numerous options in the market (I don't get paid by either of those companies, that's just what we use at work) and track every metric you can. Track how long initial page loads take, how long page transitions take, how long it takes major components to render, first paint times, absolutely anything you can that will give you a better idea of how your app performs.

Do the same thing with the Chrome DevTools (there'll be a separate post on how to use those, if you don't know how). Profile your app constantly. Save and tag the profiles with commit hashes so you can watch the performance change over time and track regressions. Track how many times components re-render, how long render cycles take, and track that data over time as well.

At this point, and at this point only, you have the information you need to start making informed decisions about performance. Are your components quick to render? Stop worrying about inline function declarations in render methods! This is the most common piece of advice given in the React community and it's quite frustrating knowing that it rarely has any effect and people spend so much energy on it anyway. Further, once you make those changes, measure that data as well. Run A/B tests, see how your metrics change, and evaluate whether the change is worth it. Performance changes often come with technical overhead, so the improvements might not even be worth leaving in production.

## Performance is a moving target

Lastly, and a point that's hard to realize - but important to understand if you'd like to avoid hitting a wall where it feels like the site can't be faster - is that every performance change will shift the proverbial goalposts a little bit. If the network is your app's bottleneck and you put code splitting in place, your biggest problem might now be rendering performance. For every change made for performance, you need to remeasure and reevaluate your performance to ensure you're still focused on the right targets.

One of the biggest mistakes I've seen teams make is picking a performance metric to optimize and then focusing too much on it. I've watched teams get obsessive about code splitting to a point that their app actually gets slower, because they're ignoring other performance metrics. A thousand small bundles that render slow components will not make your app any faster.

---

I don't know how much of this blog will be incoherent rambling (and I apologize in advance for that), but I hope that some of the knowledge will be useful to some people. Performance will be an essential focus in web development in 2019 and beyond, both as an accessibility issue and as a feature. Faster apps will make their users happier, and faster apps enable more worldwide users that otherwise wouldn't have access to your content. Hopefully using some of the lessons our team has learned we can all make a bit more of the web more performance and more accessible.
