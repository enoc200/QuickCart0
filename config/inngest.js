import { Inngest } from "inngest";
import connectDB from "./db";

// Create a client to send and receive events
export const inngest = new Inngest({ id: "quickcart-next" });

//inngest  functin to save the user data to  the db
export const syncUserCreation = inngest.createFunction(
    {
        id:'sync-user-from-clerk',
    },
    { 
       event:'clerk/user.created',

    },
    async ({ event, step }) => {
        const{id,first_name,last_name,email_addresses,image_url}=event.data;
        const userData={
            id:id,
            name:`${first_name} ${last_name}`,
            email:email_addresses[0].email_address,
            imageUrl:image_url
        };
        await connectDB();
        await User.create(userData);
    }

)

//fuction to update user data in db when user is updated in clerk
export const syncUserUpdation = inngest.createFunction(
    {
        id:'update-user-from-clerk',
    },
    {
         event:'clerk/user.updated',
    },
    async ({ event, step }) => {
         const{id,first_name,last_name,email_addresses,image_url}=event.data;
        const userData={
            id:id,
            name:`${first_name} ${last_name}`,
            email:email_addresses[0].email_address,
            imageUrl:image_url
        };
        await connectDB();
        await User.findByIdAndUpdate(id, userData);

    }
)

//ingest functon to delete user data from db when user is deleted in clerk
export const syncUserDeletion = inngest.createFunction(
    {
        id:'delete-user-with-clerk',
    },
    {
        event:'clerk/user.deleted',
    },
    async ({ event, step }) => {
        const{id}=event.data;
        await connectDB();
        await User.findByIdAndDelete(id);
    }


    
)
