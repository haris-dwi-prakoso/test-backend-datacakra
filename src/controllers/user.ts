import { Request, Response } from 'express';
import { UserService } from '../services/user';
import { PaymentService } from '../services/payment';
import { CustomRequest } from '../middlewares/auth';
import User from '../db/models/user';

const userService = new UserService();
const paymentService = new PaymentService();

/**
 * Login function
 * @param req Request body contains email and password to authenticate
 * @param res Response body contains user id, email and username data alongside authorization token
 */
export async function login(req: Request, res: Response) {
    try {
        const { email, password } = req.body
        let result = await userService.login(email, password);
        if (result) res.status(200).json(result);
        else res.status(400).json({ message: "Email or password is incorrect." })
    } catch (e) {
        console.log(e);
        res.status(500).json(e);
    }
}

/**
 * Sign up function
 * @param req Request body contains email, username, and password of the user to be created
 * @param res Response body contains message whether user was successfully registered
 */
export async function signup(req: Request, res: Response) {
    try {
        const { email, password, username } = req.body
        let existingUser = await userService.findOneByEmail(email);
        if (!existingUser) {
            let newUser = new User();
            newUser.email = email;
            newUser.password = password;
            newUser.username = username;
            newUser.isVerified = false;
            newUser.isActive = true;
            let newUserData = JSON.parse(JSON.stringify(newUser));
            console.log(newUserData);
            let result = await userService.create(newUserData);
            if (result) res.status(201).json({ message: "User successfully registered." });
        } else res.status(400).json({ message: "A user with this email is already registered." })
    } catch (e) {
        console.log(e);
        res.status(500).json(e);
    }
}

/**
 * Function to get user data
 * @param req Request authorization header contains user data, params contains id of user to get
 * @param res Response body contains user data or error message if not found
 */
export async function getUser(req: CustomRequest, res: Response) {
    try {
        let result = await userService.findOneById(Number(req.params.id));
        if (result) res.status(200).json(JSON.parse(JSON.stringify(result)));
        else res.status(404).json({ message: "User not found." });
    } catch (e) {
        console.log(e);
        res.status(500).json(e);
    }
}

/**
 * Function to update user data
 * @param req Request authorization header contains user data, params contains user id to update, body contains user data to be updated
 * @param res Response body contains message of whether update was successful or not
 */
export async function updateUser(req: CustomRequest, res: Response) {
    try {
        const { email, password, username, profilePicture, bio } = req.body;
        if (req.params.id == req.token['id']) {
            let user = await userService.findOneById(Number(req.params.id));
            if (user) {
                user = JSON.parse(JSON.stringify(user));
                user.email = email ? email : user.email;
                user.password = password;
                user.username = username ? username : user.username;
                user.profilePicture = profilePicture ? profilePicture : user.profilePicture;
                user.bio = bio ? bio : user.bio;
                let result = await userService.update(user);
                if (result) res.status(200).json({ message: "Successfully updated." });
                else res.status(500).json({ message: "Failed to update." });
            } else res.status(404).json({ message: "User not found." });
        } else res.status(400).json({ message: "User id mismatch." });
    } catch (e) {
        console.log(e);
        res.status(500).json(e);
    }
}

/**
 * Function to verify user. As an actual payment API integration is currently
 * not within the scope of this test, the verification process currently uses
 * a mock payment service.
 * @param req Request authorization header contains user data, params contains id of user to be verified
 * @param res Response body contains message of whether verification was successful or not
 */
export async function verifyUser(req: CustomRequest, res: Response) {
    try {
        if (req.params.id == req.token['id']) {
            let user = await userService.findOneById(Number(req.params.id));
            if (user) {
                user = JSON.parse(JSON.stringify(user));
                if (!user.isVerified) {
                    let payment = await paymentService.getOneByUserId(user.id);
                    if (payment?.paid) {
                        user.isVerified = true;
                        let result = await userService.update(user);
                        if (result) res.status(200).json({ message: "Successfully verified." });
                        else res.status(500).json({ message: "Failed to verify." });
                    } else res.status(400).json({ message: "User has not completed payment." });
                } else res.status(400).json({ message: "User already verified." });
            } else res.status(404).json({ message: "User not found." });
        } else res.status(400).json({ message: "User id mismatch." });
    } catch (e) {
        console.log(e);
        res.status(500).json(e);
    }
}

/**
 * Function to deactivate user. Outright deletion is avoided in order to maintain integrity
 * of the data of interaction between users.
 * @param req Request authorization header contains user data, params contains id of user to be deactivated
 * @param res Response body contains message of whether deactivation was successful or not
 */
export async function deactivateUser(req: CustomRequest, res: Response) {
    try {
        if (req.params.id == req.token['id']) {
            let user = await userService.findOneById(Number(req.params.id));
            if (user.isActive) {
                let result = await userService.deactivate(Number(req.params.id));
                if (result) res.status(200).json({ message: "Successfully deactivated." });
                else res.status(500).json({ message: "Failed to deactivate." });
            } else res.status(403).json({ message: "User already deactivated." });
        } else res.status(400).json({ message: "User id mismatch." });
    } catch (e) {
        console.log(e);
        res.status(500).json(e);
    }
}