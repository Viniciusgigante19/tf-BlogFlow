const API = "http://localhost:8080/api/posts"

document.addEventListener("DOMContentLoaded", () => {

if(document.getElementById("posts-container")){
listarPosts()
}

if(document.getElementById("post-form")){
criarPost()
}

if(document.getElementById("post-container")){
verPost()
}

})

/* LISTAR POSTS */

async function listarPosts(){

const container = document.getElementById("posts-container")

const res = await fetch(API)
const posts = await res.json()

posts.forEach(post => {

const div = document.createElement("div")
div.className = "post"

div.innerHTML = `
<a href="post.html?id=${post.id}">${post.title}</a>
<p>${post.tags || ""}</p>
`

container.appendChild(div)

})

}

/* VER POST */

async function verPost(){

const params = new URLSearchParams(window.location.search)
const id = params.get("id")

const res = await fetch(`${API}/${id}`)

if(res.status === 404){
document.getElementById("post-container").innerHTML = "Post não encontrado"
return
}

const post = await res.json()

const container = document.getElementById("post-container")

container.innerHTML = `
<h2>${post.title}</h2>
<p>${post.content}</p>
<p><strong>Tags:</strong> ${post.tags || ""}</p>
`

const deleteBtn = document.getElementById("delete-btn")

deleteBtn.onclick = async () => {

if(!confirm("Deletar este post?")) return

await fetch(`${API}/${id}`, { method:"DELETE" })

window.location.href = "index.html"

}

}

/* CRIAR POST */

function criarPost(){

const form = document.getElementById("post-form")

form.addEventListener("submit", async e => {

e.preventDefault()

const title = document.getElementById("title").value
const content = document.getElementById("content").value
const tags = document.getElementById("tags").value

const res = await fetch(API,{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body: JSON.stringify({
title,
content,
tags
})

})

const msg = document.getElementById("message")

const data = await res.json()

msg.textContent = data.message

if(res.status === 201){
form.reset()
}

})

}