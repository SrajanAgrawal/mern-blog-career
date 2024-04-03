import { useEffect, useState } from "react"
import PostCard from "../components/PostCard.jsx"
import { SearchBar } from "../components/SearchBar.jsx"

const Home = () => {

    const PostMockData =
        [{
            "id": 1,
            "userImage": "http://dummyimage.com/130x100.png/ff4444/ffffff",
            "content": "Cras non velit nec nisi vulputate nonummy. Maecenas tincidunt lacus at velit. Vivamus vel nulla eget eros elementum pellentesque.\n\nQuisque porta volutpat erat. Quisque erat eros, viverra eget, congue eget, semper rutrum, nulla. Nunc purus.\n\nPhasellus in felis. Donec semper sapien a libero. Nam dui.",
            "title": "Fusce posuere felis sed lacus. Morbi sem mauris, laoreet ut, rhoncus aliquet, pulvinar sed, nisl. Nunc rhoncus dui vel sem.",
            "image": "http://dummyimage.com/179x100.png/ff4444/ffffff",
            "category": "Music"
        }, {
            "id": 2,
            "userImage": "http://dummyimage.com/134x100.png/cc0000/ffffff",
            "content": "Cras non velit nec nisi vulputate nonummy. Maecenas tincidunt lacus at velit. Vivamus vel nulla eget eros elementum pellentesque.\n\nQuisque porta volutpat erat. Quisque erat eros, viverra eget, congue eget, semper rutrum, nulla. Nunc purus.",
            "title": "Duis consequat dui nec nisi volutpat eleifend. Donec ut dolor. Morbi vel lectus in quam fringilla rhoncus.",
            "image": "http://dummyimage.com/184x100.png/5fa2dd/ffffff",
            "category": "Electronics"
        }, {
            "id": 3,
            "userImage": "http://dummyimage.com/115x100.png/dddddd/000000",
            "content": "In hac habitasse platea dictumst. Morbi vestibulum, velit id pretium iaculis, diam erat fermentum justo, nec condimentum neque sapien placerat ante. Nulla justo.\n\nAliquam quis turpis eget elit sodales scelerisque. Mauris sit amet eros. Suspendisse accumsan tortor quis turpis.",
            "title": "Cras non velit nec nisi vulputate nonummy. Maecenas tincidunt lacus at velit. Vivamus vel nulla eget eros elementum pellentesque.",
            "image": "http://dummyimage.com/125x100.png/5fa2dd/ffffff",
            "category": "Health"
        }, {
            "id": 4,
            "userImage": "http://dummyimage.com/179x100.png/dddddd/000000",
            "content": "Integer ac leo. Pellentesque ultrices mattis odio. Donec vitae nisi.\n\nNam ultrices, libero non mattis pulvinar, nulla pede ullamcorper augue, a suscipit nulla elit ac nulla. Sed vel enim sit amet nunc viverra dapibus. Nulla suscipit ligula in lacus.",
            "title": "Phasellus in felis. Donec semper sapien a libero. Nam dui.",
            "image": "http://dummyimage.com/237x100.png/cc0000/ffffff",
            "category": "Automotive"
        }, {
            "id": 5,
            "userImage": "http://dummyimage.com/227x100.png/ff4444/ffffff",
            "content": "In sagittis dui vel nisl. Duis ac nibh. Fusce lacus purus, aliquet at, feugiat non, pretium quis, lectus.\n\nSuspendisse potenti. In eleifend quam a odio. In hac habitasse platea dictumst.",
            "title": "Duis bibendum, felis sed interdum venenatis, turpis enim blandit mi, in porttitor pede justo eu massa. Donec dapibus. Duis at velit eu est congue elementum.",
            "image": "http://dummyimage.com/146x100.png/cc0000/ffffff",
            "category": "Books"
        }, {
            "id": 6,
            "userImage": "http://dummyimage.com/148x100.png/ff4444/ffffff",
            "content": "Proin leo odio, porttitor id, consequat in, consequat ut, nulla. Sed accumsan felis. Ut at dolor quis odio consequat varius.\n\nInteger ac leo. Pellentesque ultrices mattis odio. Donec vitae nisi.\n\nNam ultrices, libero non mattis pulvinar, nulla pede ullamcorper augue, a suscipit nulla elit ac nulla. Sed vel enim sit amet nunc viverra dapibus. Nulla suscipit ligula in lacus.\n\nCurabitur at ipsum ac tellus semper interdum. Mauris ullamcorper purus sit amet nulla. Quisque arcu libero, rutrum ac, lobortis vel, dapibus at, diam.",
            "title": "Praesent blandit. Nam nulla. Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede.",
            "image": "http://dummyimage.com/211x100.png/ff4444/ffffff",
            "category": "Kids"
        }, {
            "id": 7,
            "userImage": "http://dummyimage.com/144x100.png/ff4444/ffffff",
            "content": "Curabitur in libero ut massa volutpat convallis. Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo. Maecenas pulvinar lobortis est.\n\nPhasellus sit amet erat. Nulla tempus. Vivamus in felis eu sapien cursus vestibulum.\n\nProin eu mi. Nulla ac enim. In tempor, turpis nec euismod scelerisque, quam turpis adipiscing lorem, vitae mattis nibh ligula nec sem.",
            "title": "Sed ante. Vivamus tortor. Duis mattis egestas metus.",
            "image": "http://dummyimage.com/133x100.png/cc0000/ffffff",
            "category": "Sports"
        }, {
            "id": 8,
            "userImage": "http://dummyimage.com/214x100.png/5fa2dd/ffffff",
            "content": "Maecenas ut massa quis augue luctus tincidunt. Nulla mollis molestie lorem. Quisque ut erat.\n\nCurabitur gravida nisi at nibh. In hac habitasse platea dictumst. Aliquam augue quam, sollicitudin vitae, consectetuer eget, rutrum at, lorem.",
            "title": "Sed sagittis. Nam congue, risus semper porta volutpat, quam pede lobortis ligula, sit amet eleifend pede libero quis orci. Nullam molestie nibh in lectus.",
            "image": "http://dummyimage.com/104x100.png/5fa2dd/ffffff",
            "category": "Clothing"
        }, {
            "id": 9,
            "userImage": "http://dummyimage.com/139x100.png/ff4444/ffffff",
            "content": "In hac habitasse platea dictumst. Etiam faucibus cursus urna. Ut tellus.\n\nNulla ut erat id mauris vulputate elementum. Nullam varius. Nulla facilisi.",
            "title": "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Proin risus. Praesent lectus.",
            "image": "http://dummyimage.com/204x100.png/cc0000/ffffff",
            "category": "Shoes"
        }, {
            "id": 10,
            "userImage": "http://dummyimage.com/230x100.png/5fa2dd/ffffff",
            "content": "In hac habitasse platea dictumst. Morbi vestibulum, velit id pretium iaculis, diam erat fermentum justo, nec condimentum neque sapien placerat ante. Nulla justo.\n\nAliquam quis turpis eget elit sodales scelerisque. Mauris sit amet eros. Suspendisse accumsan tortor quis turpis.\n\nSed ante. Vivamus tortor. Duis mattis egestas metus.",
            "title": "Nam ultrices, libero non mattis pulvinar, nulla pede ullamcorper augue, a suscipit nulla elit ac nulla. Sed vel enim sit amet nunc viverra dapibus. Nulla suscipit ligula in lacus.",
            "image": "http://dummyimage.com/210x100.png/5fa2dd/ffffff",
            "category": "Automotive"
        }]
    const [posts, setPosts] = useState(PostMockData)
    console.log(posts)

    // useEffect(() => {
    //     const fetchAllPosts = async () => {
    //         setPosts(PostMockData)
    //     }

    //     fetchAllPosts()
    // }, [])

    return (
        <>

            <SearchBar />
            
                {
                    posts.map((post, index) => {
                        <div key={index}>
                            <PostCard post={post} />
                        </div>
                    })
                }
                <PostCard post={PostMockData[0]} />
             
            
        </>
    )
}

export default Home