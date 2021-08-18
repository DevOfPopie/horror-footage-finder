const userDataMapper = require('../dataMappers/user');

module.exports = {

    async findUser(request, response) {
        try {

            const user = await userDataMapper.getUserById(request.params.id);
            response.json({data:user});

        } catch (error) {
            console.trace(error);
            response.status(500).json({data: [], error: `Désolé une erreur serveur est survenue, veuillez réessayer ultérieurement.`});
        }
    }

};