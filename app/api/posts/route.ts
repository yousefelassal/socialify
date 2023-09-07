import { NextResponse, NextRequest } from "next/server";
import fsPromises from "fs/promises";
import path from "path";
const { v4: uuidv4 } = require("uuid");

export async function GET(){
    const posts = await fsPromises.readFile(path.join(process.cwd(), "mockdb", "posts.json"), "utf8");
    return NextResponse.json(JSON.parse(posts));
}

export async function POST(req: any){
    const posts = await fsPromises.readFile(path.join(process.cwd(), "mockdb", "posts.json"), "utf8");
    const postsArray = JSON.parse(posts);
    const newPost = {
        id: uuidv4(),
        content: req.body.content,
        createdAt: new Date().toISOString(),
        comments: [],
        likes: 0,
        user_name: 'test_user',
    };
    postsArray.push(newPost);
    await fsPromises.writeFile(
        path.join(process.cwd(), "mockdb", "posts.json"),
        JSON.stringify(postsArray)
    );
    return NextResponse.next();
}

export async function PUT(req: any){
    const posts = await fsPromises.readFile(path.join(process.cwd(), "mockdb", "posts.json"), "utf8");
    const postsArray = JSON.parse(posts);
    const postIndex = postsArray.findIndex((post: any) => post.id === req.body.id);
    postsArray[postIndex] = {
        ...postsArray[postIndex],
        content: req.body.content,
    };
    await fsPromises.writeFile(
        path.join(process.cwd(), "mockdb", "posts.json"),
        JSON.stringify(postsArray)
    );
    return NextResponse.next();
}

export async function DELETE(req: any){
    const posts = await fsPromises.readFile(path.join(process.cwd(), "mockdb", "posts.json"), "utf8");
    const postsArray = JSON.parse(posts);
    const postIndex = postsArray.findIndex((post: any) => post.id === req.body.id);
    postsArray.splice(postIndex, 1);
    await fsPromises.writeFile(
        path.join(process.cwd(), "mockdb", "posts.json"),
        JSON.stringify(postsArray)
    );
    return NextResponse.next();
}