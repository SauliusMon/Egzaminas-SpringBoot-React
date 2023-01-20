//css
import { useState } from 'react';
import './CreateArticle.css';

export function CreateArticlePage() {

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");

    const CreateArticle = () =>  {
        fetch(
            // http://localhost:8080
            '/api/v1/post-article', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name,
                    description,
                    registered: false
                })
            }
        )
    };

    return (
        <table id="create-article">
            <tr id="create-header">
                <th>Naujas įrašas</th>
            </tr>
            <tr>
                <th>Antraštė</th>
            </tr>
            <tr>
                <td>
                    <input type="text" id="name" value={name}
                    onChange={(e) => setName(e.target.value)}
                    ></input>
                </td>
            </tr>
            <tr>
                <th>Tekstas</th>
            </tr>
            <tr>
                <td>
                    <input type="text" id="description" value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    ></input>
                </td>
            </tr>
            <tr>
                <td>
                    <button onClick={CreateArticle}>Publikuoti</button>
                </td>
            </tr>
        </table>
    )
}