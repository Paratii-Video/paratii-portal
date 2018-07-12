# Paratii Portal Style Guide (in progress)


## What is it?
The application is served up by a relatively simple `express` server running on `node.js`. The server-side code is processed by `babel`. For the most part this `express` app serves up a static `index.html` file, but there are specially-handled routes for serving up videos as embedded content. In development mode `express` uses the application's `webpack` configuration to provide hot code reloading in the browser.

## Colors:

## Typography:

## Components:

The entire portal UI is rendered as a single page application built with [React](https://reactjs.org/). Application data is stored in [Redux](https://redux.js.org/) and is passed down to React components using a combination of techniques (more on that later). 

**Why the UI is built the way it is:**

- Redux provides one single source of truth for our application data that can be accessed by all components with relative ease
- It is easy to connect any component to the `redux` store, no matter how deep in the render tree it is
- Redux encourages us to use a consistent model for our application data and creates framework for how that data should be accessed and updated
- All application data is managed in a top-down fashion. This means that when application data needs to be updated (and we want to see that data trickle down to the UI), we only need update the `redux` store as these changes will then propagate down to whichever pieces of the UI depend on the data that has changed.

This makes it much easier to reason about the application. **Essentially, our UI is just a function**. Given a certain redux state, our app will render in a particular, mostly deterministic, way. There are some parts of the app that necessarily make this render non-deterministic (with respect to the store), but for the most part it is true.

**Container vs Component**

In our application we have containers and components. Components are what define the shape of the UI. They accept props and use those props (and perhaps their own internal state) to render a part of the UI. A container, on the other hand, is a higher-order component that wraps a regular component and is connected to the `redux` store. It maps certain parts of the `redux` store to props, and also allows you to map `redux` actions to props. Then, these props are passed to a regular component. When parts of the store that the container maps to props are modified, the wrapped component will be given new props and subsequently re-render "automatically". Containers are what enables seemless top-down functional rendering of our UI.


**Data Immutability (and why it is important)**

All of the data in the `redux` store is made up of immutable data structures by way of [Immutable](https://facebook.github.io/immutable-js/). It is a requirement of `redux` that when you update a piece of state you cannot just mutate properties in your existing state. If you try to do this, your UI will break :). Instead, if you want to update a piece of state you must create a new object that has the desired modification(s). `Immutable` provides a nice api to make doing this fairly trivial in a scalable fashion.

⚠️⚠️
**Takeaway: The entire `redux` store must be made up of `Immutable` structures, no matter how far down into the state tree you go. This rule should not ever be violated.**
⚠️⚠️

<br /><br/>

**When to use react state**


- Almost never store application data in `react` component state
- Store UI state in `react` component state
    - *e.g. whether a dropdown is open, whether a checkbox is checked, etc*
- If UI state does need to be accessed by other components in different parts of the render tree, though, it may need to be abstracted and put into the `redux` store


**Selectors**

Selectors are a very important concept in our application. They are what we use to get calculated pieces of state. 

*Example:*

Let's say that in the store we have a video record, and within that record we store and a raw number of percentage of that video that has been transcoded.
We can envision a component that doesn’t care about the raw percentage, but rather whether or not this video “is this fully transcoded”. Rather than add a property to our video in the `redux` store called “isFullyTranscoded” (data duplication), we instead write a selector that will read the store, check the raw number, and return `true` if the raw number is `100`. Then we can pass the result of this selector to our connected component.

Why would we not perform this logic in a `react` component directly? Although there are cases where this is valid, for any sort of complex calculation a selector is best. Further, the logic in a selector may need to be used by multiple components and even in some asynchronous actions. Another nice benefit is it keeps our code better organized and our components simpler.
