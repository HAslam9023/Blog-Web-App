// Imports Express and its types
import express, {type Express, type Request, type Response} from "express";

/**
 * The Express application.
 */
const app: Express = express();
/**
 * The port that the server will listen on.
 */
const port: number = 3000;

/**
 * Post times
 */
const dateTimes: string[] = [];
/**
 * Posts
 */
const posts: string[] = [];

// Middleware
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

/**
 * Handles the GET request for the root route.
 * @param _req The request object (not used).
 * @param res The response object.
 */
function handleGetRoot(_req: Request, res: Response): void
{
    res.render("index.ejs");
}

/**
 * Handles the POST request for new posts.
 * @param req The response object.
 * @param res The response object.
 */
function handlePostRoot(req: Request, res: Response): void
{
    const postData: {post: string} = req.body;

    dateTimes.push(new Date().toLocaleString());
    posts.push(postData.post);

    res.render("index.ejs", {dateTimes: dateTimes, posts: posts});
}

/**
 * Handles the POST request to transfer the user to a page for editing a post.
 * @param req The response object.
 * @param res The response object.
 */
function handlePostEdit(req: Request, res: Response): void
{
    const postData: {post: string, postID: number} = req.body;

    res.render("edit.ejs", {post: postData.post, postID: postData.postID});
}

/**
 * Handles the POST request to change a particular post.
 * @param req The response object.
 * @param res The response object.
 */
function handlePostChange(req: Request, res: Response): void
{
    const postDataChange: {post: string, postID: number} = req.body;

    dateTimes.splice(postDataChange.postID, 1);
    posts.splice(postDataChange.postID, 1);

    dateTimes.push(new Date().toLocaleString());
    posts.push(postDataChange.post);

    res.render("index.ejs", {dateTimes: dateTimes, posts: posts});
}

/**
 * Handles the POST request to delete a particular post.
 * @param req The response object.
 * @param res The response object.
 */
function handlePostDelete(req: Request, res: Response): void
{
    const postDataDelete: {postID: number} = req.body;

    dateTimes.splice(postDataDelete.postID, 1);
    posts.splice(postDataDelete.postID, 1);

    res.render("index.ejs", {dateTimes: dateTimes, posts: posts});
}

/**
 * Logs a message indicating that the web app has started.
 */
function logServerStart(): void
{
    console.log(`Server started on port ${port}`);
}

// GET Requests
app.get("/", handleGetRoot);

// POST requests
app.post("/new-post", handlePostRoot);
app.post("/edit", handlePostEdit);
app.post("/change", handlePostChange);
app.post("/delete", handlePostDelete);

// Starts the web app
app.listen(port, logServerStart);