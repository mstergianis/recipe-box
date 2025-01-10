# Recipe Box

I like to cook. I get a lot of recipes from YouTube. YouTube is a bad place to
search recipes. So I want a place that I can host that hold recipes I like, and
ideally provide me with some quality of life features such as scaling.

This project is a vehicle for keeping my skills sharp, learning new tech, and
hopefully providing myself with some small value. If you're reading this, it's
unlikely this project will be of much use to you.

## Backend

GraphQL golang server with postgres as the data layer. Super basic.

## Frontend

NextJS with Apollo GraphQL to talk to the backend.

## Roadmap

### Backend
- [ ] snapshot testing with [pacdiff](https://github.com/mstergianis/pacdiff) if that ever gets off the ground
- [ ] some kind of natural language processing of recipes?
  - ideally you would be able to just paste in a recipe and it can be sent to
    the backend for processing, and things just get figured out. That way you
    don't need to fill out a form and click buttons over and over.
  - automatic ingredient parsing?
  - automatic step parsing?

### Frontend
- Form rewrite that uses more standard idioms to NextJS. I just rolled my own
  and it's kludgy
