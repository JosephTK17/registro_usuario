// const faker = require('faker');
// const boom = require('@hapi/boom');

export class Usuario {
    id: number;
    name: string;
    date: string;
}

class UsersService {
    users: Array < Usuario > = new Array < Usuario > ();

    constructor() {
        this.users;
        this.generate();
    }

    generate() {
        // const limit = 10;
        // for (let index = 0; index < limit; index++) {
        //     let objeto = new Usuario();
        //     objeto.id = 1;
        //     objeto.name = 'Joseph';
        //     objeto.date = '02/09/2022';
        //     this.users.push(objeto);
        // }
        let objeto = new Usuario();
            objeto.id = 1025524153;
            objeto.name = 'Joseph';
            objeto.date = '02/09/2022';
            this.users.push(objeto);

            let objeto2 = new Usuario();
            objeto2.id = 2;
            objeto2.name = 'Juanito Alcachofa';
            objeto2.date = '02/09/2022';
            this.users.push(objeto2);
    }

    async create(data: any) {

        const newUser = {
            id: Math.round(Math.random()* 100),
            ...data
        }

        for (let i = 0; i < this.users.length; i++) {
            if (this.users[i].id == data.id) {
                throw new Error('existing user');
            }
        }
        this.users.push(newUser)
            return newUser;
    }

    consultar() {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(this.users);
            }, 2000);
        });
    }

    async update(id: number, changes: any) {
        const index = this.users.findIndex(item => item.id == id);
        
        if (index === -1) {
            throw new Error('User notFound');
        }

        for (let i = 0; i < this.users.length; i++) {
            if (this.users[i].id == changes.id) {
                throw new Error('existing user');
            }
        }
        
        const user = this.users[index];
        this.users[index] = {
            ...user,
            ...changes
        };
        return this.users[index];
    }

    async consultarUno(id:number) {
        const user = this.users.find(item => item.id == id)
        if (!user) {
            throw new Error('User notFound');
        }
        return user;
    }

    async delete(id:number) {
        const index = this.users.findIndex(item => item.id == id);
        if (index === -1) {
            throw new Error('User notFound');
        }
        this.users.splice(index, 1);
        return{id};
    }
}

module.exports = UsersService;