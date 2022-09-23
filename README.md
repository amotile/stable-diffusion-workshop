# Amotile's Workbench - Stable Diffusion
A browser based frontend to generate images with stable diffusion. Written in React.

Here's a video showing how it can be used:
https://youtu.be/P9w57TiJWUM

## Features
* txt2img & img2img
* history of generated images
* simple to try out variations
* no additional installation needed
* possibility to add new backend, currently only AUTOMATIC1111 supported.

## How to run
### Hosted
#### how
* Go to this url: https://amotile.github.io/stable-diffusion-workshop/
* Change the backend if needed, default points to a AUTOMATIC1111 installation on your own localhost
* That's it.

#### why
* Pro: No install required
* Con: Might break at any time if a new version is deployed

### Your own copy
#### how
* Clone or download this repo.
* Host the /doc folder in any static website hosting system. 
* Then configure like above.

#### why
* Pro: You decide when you update
* Con: Slightly more complicated (But if you got AUTOMATIC1111 running this is easy)

### Development build

#### how
* It's pretty standard [create-react-app](https://create-react-app.dev/) project, so run:
* yarn
* yarn run start

#### why
* Pro: You can change the code
* Con: Yet more complicated


## Why this project?
* I wanted a UI that better fit my workflow
* I know how to build things with react
