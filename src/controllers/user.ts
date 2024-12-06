import { Request, Response } from 'express';
import { UserService } from 'services/user';

export class UserController {
    constructor(
        private readonly userService: UserService
    ) { }

    async login(req: Request, res: Response) {
        try {
            const { email, password } = req.body
            let result = await this.userService.login(email, password);
            if (result) {
                res.status(200).json(result);
            } else res.status(400).json({ message: "Email or password is incorrect." })
        } catch (e) {
            console.log(e);
            res.status(500).json(e);
        }
    }

    async signup(req: Request, res: Response) {
        try {
            const { email, password, username } = req.body
            let newUser = {
                email: email,
                password: password,
                username: username,
                isVerified: false,
                isActive: true
            }
            let result = await this.userService.create(newUser);
            if (result) res.status(200).json(result);
        } catch (e) {
            console.log(e);
            res.status(500).json(e);
        }
    }

}