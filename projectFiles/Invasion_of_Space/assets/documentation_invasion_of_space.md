# Idea and Concept

For this assignment, we needed to use some sort of API (application programming interface) to store/get data that we'd use in a small application. The teacher showed us how we could use a service from firebase as an example on how to accomplish this.  
The other students would make little web projects or small mobile apps that could be used as to-do lists or similar, but as I really liked experimenting with Unity during that time, I decided to take a bit of a different approach and create a game.

Instead of using firebase as the API for my project, I'd create save files in my game where I could store and get information from/to, using "JsonUtility", which is a built-in API from Unity. This way, I would still follow the rules of the assignment, while also being able to further play around with Unity and find out more about what it has to offer.

As personal objectives for this project, I wanted to see how well making a game for smartphone devices would work with Unity, and I also wanted to have a bigger focus on UI design and using TextMeshPro to add some custom fonts and UI element designs.

The main idea for the gameplay was to create something like "Space Invaders", as should be obvious by the game's title. There have been many recreations and reimaginings of this game over the years, and all of them took different parts of the original and built upon those.  
For my version, the main parts of the original that I wanted to include were the following:

- The player should be able to steer a spaceship at the bottom of the screen.
- The spaceship should shoot upwards to hit enemies.
- There would be different enemy types, and some of them could shoot back.

If I had some extra time, I also wanted to add something like a leveling system into the game, where you could acquire upgrades for your spaceship, or change what kind of shot you'd fire.

# Implementation

The time limit for this project was very short, so because I had many focuses elsewhere, I couldn't make the gameplay as interesting and varied as I had hoped.

I did manage to create two enemies, but their movement is very simple, and they don't really have any interesting mechanics. One just moves straight down the screen and the other moves around a bit and shoots on occasion.

I'm happier with the player character. After each shot there's a short cooldown, so you can't just keep spamming the shoot button. You can also switch the movement of the player's spaceship between tilt controls and just normal buttons. The movement on both modes doesn't quite feel as good as I had hoped, but you can switch between them while playing, so a player could figure out quite easily, which control scheme they like more.

I've also added vibrations for each shot and when the player gets hit. The vibrations for the shots are good haptic feedback to show the player that their input has been received, and the stronger and longer vibrations for the death screen are used to highlight a change in gameplay, in this case that the game has ended.

The UI ended up being quite nice. There isn't much variety in fonts and colors, but all the views work as expected and have easily readable layouts. The views also adjust themselves to the screen size, making the UI work the same over different types of handheld devices.  
I also like the little animation the options menu has during gameplay, where it slides in from one side. While the options menu is open, the normal gameplay UI is hidden to not distract from the UI elements in the options menu, but the state of the gameplay is still visible, so that players can jump right back in after they close the menu.

Implementing the save-states was thankfully no issue at all. The API that I used from Unity worked as expected, and it was quite straight forward to create three different save files locally for the three possible save-states and match them to each other.

# Conclusion

With this project, I have managed to implement the requirements for the school assignment, while additionally making a little game out of it.

I personally think that the focus during development should have been more on the gameplay, but as the assignment was mainly about the use of the API, the menus and the saving / loading of the save states had priority here.

If I had some extra time, I would have liked to add more enemy types, make the game progression more interesting, and add upgrades to the players spaceship. An upgrade/leveling feature was planned initially, but due to time restraints, it didn't make it into the final game.

This project might have been a bit too ambitious for the given timeframe, but it's still a finished project, and I learned a lot during the making of it.
