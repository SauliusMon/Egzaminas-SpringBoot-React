import { CreateArticlePage } from "./CreateArticlePage";
import { ViewArticles } from "./ViewArticles";

//css
import './Menu.css';

export function Menu(props) {

    const notifyActiveChange = (state) => {
        props.onChange(state);
    }

    return (
       <tbody>
        <a id="link-viewarticles" href="#" onClick={(e) => 
            notifyActiveChange("CreateArticle")}> Rašyti naują</a>

        <a id="link-viewarticles" href="#" onClick={(e) => 
            notifyActiveChange("ViewArticles")}> Žiūrėti straipsnius</a>
        </tbody>
        )
}
