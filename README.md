# Ball Master Clone
This is a clone of the final stage of the Ball Master mobile game. You have 50 balls, and you see how long you can go until one of the bricks hits the bottom level.
This is a work in progress in the sense that I will keep adding features as I think of them and fixing bugs as I find them. 

I lost a couple hours of work (which is why I shifted this to GitHub), so the Help menu is currently not implemented, but I think I'll be able to get it back up soon.

# Known bugs
A checked box is a fixed bug.
- [] Balls can get trapped inside of bricks until the brick breaks -- I think it's something with the corner collisions.
- [X] (Oct. 23, 2020) Balls coming at a brick from certain angles won't collide with bricks at all. This was fixed, but then I lost some work. It's an issue with the broad phase collision detection, and should be easy to fix. 

That's all I'm aware of currently, but please create an issue if you notice anything else.

# Features to implement
- [] New block shapes and power blocks
- [] Help menu
- [] Particle system
- [] Ideas? Open an issue or a pull request.