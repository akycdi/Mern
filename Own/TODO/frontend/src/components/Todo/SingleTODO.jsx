import { Typography } from "@mui/material";
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import EditIcon from '@mui/icons-material/Edit';

function SingleTODO(props) {

    function deleteTODO(id) {
        fetch(`http://localhost:3000/todo/delete/${id}`, {
            method: "DELETE",
            headers: {
                username: localStorage.getItem("user"),
                "content-type": "application/json",
                authorization: "Bearer " + localStorage.getItem("token"),
            },
        })
            .then((res) => res.json())
            .then((data) => {
                props.setData(data.TODO);
                props.setCounter(data.TODO.length);
            })
            .catch((error) => {
                console.log("Error deleting TODO:", error);
            });
    }
    let data = props.data;
    return (
        <div>
            {data && data.map((todo) => (
                <div
                    style={{
                        display: "flex",
                        padding: 10
                    }}
                    key={todo.id}>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>{todo.title}</Typography>
                    <div>
                        {/* <EditIcon color="primary" size="large" ></EditIcon> */}
                        <HighlightOffIcon color="primary" size="medium" onClick={() => deleteTODO(todo.id)} />
                    </div>
                </div>
            ))}
        </div>
    );
}

export default SingleTODO;
