import jwt from 'jsonwebtoken';

// Autenticação de rota
	const authenticated = async (req, res, next) => {
		const {access_token} = req.cookies;

		if (access_token){
			try {
				const [, token] = access_token.split(' ');

				await jwt.verify(token, process.env.SECRET);

				return next();
			} catch(err){
				console.log(err);
				res.redirect('/');
			}
		} else {
			res.session.user = null;
			return res.redirect('signin')
		}
	}

export {authenticated};
