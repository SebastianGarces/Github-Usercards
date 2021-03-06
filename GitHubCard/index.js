/* Step 1: using axios, send a GET request to the following URL 
           (replacing the palceholder with your Github name):
           https://api.github.com/users/<your name>
*/

/* Step 2: Inspect and study the data coming back, this is YOUR 
github info! You will need to understand the structure of this 
data in order to use it to build your component function 

Skip to Step 3.
*/

/* Step 4: Pass the data received from Github into your function, 
create a new component and add it to the DOM as a child of .cards
*/

axios
	.get("https://api.github.com/users/sebastiangarces")
	.then(response => {
		console.log(response);
		let cards = document.querySelector(".cards");
		cards.appendChild(cardCreator(response));
	})
	.catch(err => {
		console.log("Error", err);
	});

/* Step 5: Now that you have your own card getting added to the DOM, either 
          follow this link in your browser https://api.github.com/users/<Your github name>/followers 
          , manually find some other users' github handles, or use the list found 
          at the bottom of the page. Get at least 5 different Github usernames and add them as
          Individual strings to the friendsArray below.
          
          Using that array, iterate over it, requesting data for each user, creating a new card for each
          user, and adding that card to the DOM.
*/

const followersArray = [
	"nerissaj",
	"JasonNeale",
	"HamidAzizy",
	"JameaKidrick",
	"dswhitely1"
];

// followersArray.forEach(user => {
// 	axios
// 		.get(`https://api.github.com/users/${user}`)
// 		.then(response => {
// 			// console.log(response);
// 			let cards = document.querySelector(".cards");
// 			cards.appendChild(cardCreator(response));
// 		})
// 		.catch(err => {
// 			console.log("Error", err);
// 		});
// });

const createFollowersCards = user => {
	return axios
		.get(`https://api.github.com/users/${user}/followers`)
		.then(res => {
			console.log(res.data);
			return res.data;
		})
		.then(followersArray => {
			followersArray.forEach(follower => {
				return axios
					.get(`https://api.github.com/users/${follower.login}`)
					.then(res => {
						console.log(res);
						let cards = document.querySelector(".cards");
						cards.appendChild(cardCreator(res));
					})
					.catch(err => console.log(err));
			});
		})
		.catch(err => console.log(err));
};
createFollowersCards("SebastianGarces");

/* Step 3: Create a function that accepts a single object as its only argument,
          Using DOM methods and properties, create a component that will return the following DOM element:

<div class="card">
  <img src={image url of user} />
  <div class="card-info">
    <h3 class="name">{users name}</h3>
    <p class="username">{users user name}</p>
    <p>Location: {users location}</p>
    <p>Profile:  
      <a href={address to users github page}>{address to users github page}</a>
    </p>
    <p>Followers: {users followers count}</p>
    <p>Following: {users following count}</p>
    <p>Bio: {users bio}</p>
  </div>
</div>

*/

const cardCreator = response => {
	let myCard = document.createElement("div");
	myCard.classList.add("card");

	let cardImage = document.createElement("img");
	cardImage.setAttribute("src", response.data.avatar_url);
	myCard.appendChild(cardImage);

	let cardContainer = document.createElement("div");
	cardContainer.classList.add("card-info");
	myCard.appendChild(cardContainer);

	let cardName = document.createElement("h3");
	cardName.textContent = response.data.name;
	cardName.classList.add("name");
	cardContainer.appendChild(cardName);

	let username = document.createElement("p");
	username.textContent = response.data.login;
	username.classList.add("username");
	cardContainer.appendChild(username);

	let location = document.createElement("p");
	location.textContent = `Location:  ${response.data.location}`;
	cardContainer.appendChild(location);

	let profile = document.createElement("p");
	profile.textContent = "Profile:  ";
	cardContainer.appendChild(profile);

	let url = document.createElement("a");
	url.textContent = `${response.data.html_url}`;
	url.setAttribute("href", response.data.html_url);
	url.setAttribute("target", "_blank");
	profile.appendChild(url);

	let followers = document.createElement("p");
	followers.textContent = `Followers: ${response.data.followers}`;
	cardContainer.appendChild(followers);

	let following = document.createElement("p");
	following.textContent = `Following: ${response.data.following}`;
	cardContainer.appendChild(following);

	let bio = document.createElement("p");
	bio.textContent = `Bio: ${response.data.bio}`;
	cardContainer.appendChild(bio);

	return myCard;
};

/* List of LS Instructors Github username's: 
  tetondan
  dustinmyers
  justsml
  luishrd
  bigknell
*/
