
import { Axios } from "axios";
import { fetchUserById } from "../fetch/index"

function patchUsers (type, username, recipientUsername) {

    const userToPatch = {}
    const userToPatch2 = fetchUserById(recipientUsername)

    switch (type) {
        case 'follow':
            break;
        case 'unfollow':
            break;
        case 'block':
            break;
        case 'unblock':
            break;
    }
    
    // type = follow or unfollow

    // get user from username
    // add to/remove from following list

    // get user to follow
    // add to/remove from followers list

}