import { useEffect, useState } from 'react';

export function ArticleReadMore(props) {

    const [article, setArticle] = useState([]);
    const [comments, setComments] = useState([])

    const [commentName, setCommentName] = useState("");
    const [commentDescription, setCommentDescription] = useState("")

    const setArticleID = ((articleID) => { 
        currentArticleId = articleID
        }
    )
    //On init sets article ID
    useEffect(() => {
        setArticleID(props.articleID)
        setComments(article.comments)
    })
    var currentArticleId;


    useEffect(() => {
        fetch(`http://localhost:8080/api/v1/get-article/${currentArticleId}` )
            .then((response) => response.json())
            .then(setArticle)
    }, [currentArticleId]);

    const CreateComment = () =>  {
        fetch(
            `/api/v1/article_comments/${currentArticleId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    commentName,
                    commentDescription,
                    registered: false
                })
            }
        )
    };

    return (
    <table>
        <thead>
            <tr>
                <th id="article-name">{article.name}</th>
            </tr>
            <tr>
                <td id="article-date">{article.publishDate}</td>
            </tr>
            <tr>
                <td id="article-description">{article.description}</td>
            </tr>
        </thead>
        <tbody>
            <tr>
                <th>Palikti komentarą</th>
            </tr>
            <tr>
                <td>Autorius</td>
            </tr>
            <tr>
                <td>
                    <input type="text" id="commentName" value={commentName}
                    onChange={(e) => setCommentName(e.target.value)}
                    ></input>
                </td>
            </tr>
            <tr>
                <td>Komentaras</td>
            </tr>
            <tr>
                <td>
                    <input type="text" id="commentDescription" value={commentDescription}
                        onChange={(e) => setCommentDescription(e.target.value)}
                    ></input>
                </td>
            </tr>
            <tr>
                <td>
                    <button onClick={CreateComment}>Komentuoti</button>
                </td>
            </tr>
        </tbody>
        <tfoot>
            <tr>
                <th>Komentarai</th>
            </tr>
            <tr> 
                <td>Comment</td>
                {comments !== undefined && comments !== null ?
                    comments.map(comment => (
                    <td id="comment">
                        <td>{comment} Comment</td>
                    </td>
                    )) 
                    : 
                    <tr>
                        <td>No new comments</td>
                    </tr>
                }
            </tr>
        </tfoot>
    </table>)
}