import { getUsers, deleteUserById, isAdmin } from "../api/admin.js";
import { showLoader, hideLoader } from '../utils/loader.js';
import { requireAuth } from "../utils/requireAuth.js";
requireAuth();

const userInfo = JSON.parse(localStorage.getItem("userInfo"));

if (isAdmin(userInfo)) {
    const users = async () => {
        try {
            showLoader();
            const allUsersResponse = await getUsers();
            hideLoader();

            // Log the response to understand its structure
            console.log(allUsersResponse);

            // Check if the response has a data property that is an array
            const allUsers = Array.isArray(allUsersResponse.data) ? allUsersResponse.data : [];

            const tableBody = document.getElementsByClassName("table-body")[0];
            const divBody = document.getElementsByClassName("div-body")[0];

            if (allUsers.length > 0) {
                tableBody.innerHTML = allUsers.map((item, index) => `
                    <tr>
                        <th scope="row">${index + 1}</th>
                        <td style="font-size:20px">${item.firstName}</td>
                        <td style="font-size:20px">${item.lastName}</td>
                        <td style="font-size:17px">${item.role}</td>
                        <td>
                            <button style="border: 0; padding: 5px 17px;" class="deleteButton" data-user-id="${item._id}">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-trash3" viewBox="0 0 16 16">
                                <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5"/>
                                </svg>
                            </button>
                        </td>
                    </tr>
                `).join('');
            } else {
                divBody.innerHTML = "User not found";
            }

            attachDeleteEventListeners();

        } catch (error) {
            console.error("Error fetching users:", error);
        }
    };

    const attachDeleteEventListeners = () => {
        const deleteButtons = document.querySelectorAll(".deleteButton");

        if (deleteButtons.length > 0) {
            deleteButtons.forEach(button => {
                button.addEventListener('click', async () => {
                    try {
                        const userId = button.getAttribute('data-user-id');
                        await deleteUserById(userId);
                        await users(); // Refresh user list after deletion
                    } catch (error) {
                        console.error("Error deleting user:", error);
                    }
                });
            });
        } else {
            console.warn('No delete buttons found.');
        }
    };

    document.addEventListener("DOMContentLoaded", users);
} else {
    console.error("Access denied: User is not an admin.");
}
