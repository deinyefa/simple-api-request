const axios = require("axios");

async function main() {
	const products = (await axios.get(
		"https://ca.desknibbles.com/products.json?limit=250"
	)).data.products;

	const users = (await axios.get(
		"https://s3.amazonaws.com/misc-file-snack/MOCK_SNACKER_DATA.json"
	)).data
		.map(user => ({
			...user,
			fave: products.find(product => product.title === user.fave_snack),
		}))
		.filter(user => user.fave);

	console.log(new Set(users.map(user => user.fave.title)));
	console.log(users.map(user => user.email));
	console.log(
		users
			.reduce(
				(total, user) =>
					total +
					user.fave.variants.reduce(
						(vTotal, variant) => parseFloat(vTotal + variant.price),
						0
					),
				0
			)
			.toFixed(2)
	);
}

main();
