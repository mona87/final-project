#Happy Hour! (Austin Edition)

##Description
The purpose of this app is to showcase various restaurants with happy hour specials based on the user's geographical location in Austin, TX. It was inspired by my friends and our constant debates about where we should go for cheap drinks. This app is great for people who are new to Austin, college students, or simply stressed out from their jobs. If your looking for a way to relax on a small budget; this is the app is for you!  

##Wireframes
Veiw my wireframes here: <br/>
https://github.com/mona87/my-final-project/blob/master/final/wireframes/Happy%20Hour!.pdf

##User Stories
My Trello board: <br/>
https://trello.com/b/1m3Xivfq/happy-hour-final-project

##Models
####User Model
User Model has a a many-to-many relationship with the restaurant model<br/>
```
name: string, null, required,
password: string, null, required,
email: string, null, required,
userId: string, null, required,
createdAt: number, Date.Now(), required
latitude: number, null, required
longitude: number, null, required
favoriteList: array, null 
```
####Restaurant Model
The Restaurant Model has a many-to-many relationship to the User Model
```
name: string, null, required
id: string, null, required
createdAt: number, Date.Now(), required
info: string, null, required
website: string, null, required
phone: string, null, required
address: string, null, required
latitude: number, null, required
longitude: number, null, required
```
Validation will be needed for login and sign-up

##APIs, Plugins, Libraries and Frameworks
<strong>Frameworks:</strong> React.js, Backbone.js, Bootstrap, Cordova? <br/>
<strong>Libraries</strong>: jQuery, Validator.js <br/>
<strong>APIs:</strong> Google Maps, Parse
