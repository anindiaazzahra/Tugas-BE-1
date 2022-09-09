const { User } = require('../../models');
const bcrypt = require('bcrypt');

module.exports = {
    handlerGetAllUser: async (req, res) => {
        const users = await User.findAll();
        const user = await users.map((e) => {
            const { id, fullName, shortName, photo } = e;
            return { id, fullName, shortName, photo }
        })
        res.status(200).json({
            status : "success",
            message: "Successfully get all users",
            data: user
        });
    },
    handlerGetUserById: async (req, res) => {
        const { id } = req.params;
        const user = await User.findByPk(id);
        if (!user) {
            res.status(404).json({
                message: "User not found",
            });
        } else {
            res.status(200).json({ 
                status: "success",
                message: "Successfully get user by id",
                data: user
            });
        }
    },
    handlerPostUser: async (req, res) => {
        const { email, password, fullName, shortName, biodata, angkatan, jabatan } = req.body;
        const hashPassword = await bcrypt.hash(password, 10);
        const user = await User.create({
            email,
            password: hashPassword,
            fullName,
            shortName,
            biodata,
            angkatan,
            jabatan,
        });
        res.status(200).json({    
            status: "success",
            message: "Successfully create user",
            data: {
                id: user.id,
                email: user.email,
                fullName: user.fullName, 
                shortName: user.shortName, 
                biodata: user.biodata, 
                angkatan: user.angkatan, 
                jabatan: user.jabatan}
        });
    },
    handlerPutUserById : async (req, res) => {
        const { id } = req.params;
        const { fullName, shortName, biodata, angkatan, jabatan } = req.body;
        const user = await User.findByPk(id);
        if (!user) {
            res.status(404).json({
                message: "User not found",
            });
        } else {
            await user.update({
                fullName,
                shortName,
                biodata,
                angkatan,
                jabatan,
            });
            res.status(200).json({    
                status: "success",
                message: "Successfully update user"
            });
        }
    },
    handlerDeleteUserById: async (req, res) => {
        const { id } = req.params;
        const user = await User.findByPk(id);
        if (!user) {
            res.status(404).json({
                message: "User not found",
            });
        } else {
            await user.destroy();
            res.status(200).json({
                status: "success",
                message: "Successfully delete user"
            });
        }
    },
    handlerGetUserByName: async (req, res) => {
        const { name } = req.query;
        const users = await User.findAll({
            where: {
                fullName: name,
            },
        });
        res.status(200).json({
            status: "success",
            message: "Successfully get user by name",
            data: users
        }); 
        
    },
}