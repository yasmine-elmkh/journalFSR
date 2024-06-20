import { getArticleByUserId, deleteArticaleById } from "../api/article.js";
import { dateFormat } from "../utils/dateFormate.js";
import { showLoader, hideLoader } from '../utils/loader.js';
import { requireAuth } from "../utils/requireAuth.js";
requireAuth()

const userInfo = JSON.parse(localStorage.getItem("userInfo"));

if (userInfo) {

    (async () => {
        try {
            showLoader()
            const articles = await getArticleByUserId(userInfo?._id);
            hideLoader()
            const tableBody = document.getElementsByClassName("table-body")[0];
            const divBody = document.getElementsByClassName("div-body")[0];

            if (articles.length > 0) {
                tableBody.innerHTML = articles.map((item, index) => `
                    <tr>
                        <th scope="row">${index + 1}</th>
                        <td style="font-size:20px">${item.title.length > 20 ? item.title.slice(0,20) + "..." : item.title}</td>
                        <td style="font-size:17px">${item.description.length > 20 ? item.description.slice(0, 20) + "..." : item.description}</td>
                        <td style="font-size:15px">${dateFormat(item.createdAt).time} ${dateFormat(item.createdAt).date}</td>
                        <td>
                            <button style="border: 0; padding: 5px 17px;"  class="deleteButton" data-article-id="${item._id}">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-trash3" viewBox="0 0 16 16">
                                <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5"/>
                                </svg>
                            </button>
                        </td>
                    </tr>
                `).join('');
            } else {
                tableBody.innerHTML = "No articles found";
            }

            console.log(articles);
        } catch (error) {
            console.error("Error fetching articles:", error);
        }
    })();

    const deleteButtons = document.querySelectorAll("deleteButton");

    console.log(deleteButtons)
    if (deleteButtons) {
        deleteButtons.forEach(button => {
            button.addEventListener('click', async () => {
                try {
                    const articleId = button.getAttribute('data-article-id');
                    await deleteArticaleById(articleId);
                    const updatedArticles = await getArticleByUserId(userInfo._id);
                    if (updatedArticles.length > 0) {
                        tableBody.innerHTML = updatedArticles.map((item, index) => `
                            <tr>
                                <th scope="row">${index + 1}</th>
                                <td>${item.title}</td>
                                <td>${item.description.length > 100 ? item.description.slice(0, 100) + "..." : item.description}</td>
                                <td>${dateFormat(item.createdAt).time} ${dateFormat(item.createdAt).date}</td>
                                <td>
                                    <button style="border: 0; padding: 5px 17px;"  class="deleteButton" data-article-id="${item._id}">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-trash3" viewBox="0 0 16 16">
                                            <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5"/>
                                        </svg>
                                    </button>
                                </td>
                            </tr>
                        `).join('');
                        console.log(updatedArticles.length)
                    } else {
                        divBody.innerHTML = "No articles found";
                    }
                } catch (error) {
                    console.error("Error deleting article:", error);
                }
            });
        });
    }
    else {
        console.warn('No delete buttons found.');
    }
}
