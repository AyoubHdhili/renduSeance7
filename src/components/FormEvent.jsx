import { useFormik } from "formik";
import { Button, Form } from "react-bootstrap";
import { add, get, update } from "../services/eventServices";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";

function FormEvent() {
    const [params, setParams] = useSearchParams();
    const [id, setId] = useState(params.get('id'));

    useEffect(()=>{
        console.log(params.get('id'));
        fetchById(id);

    },[])

    const fetchById = async (id) => {

        try {
            const result = await get(id);
            console.log(result.data);
            f.setValues(result.data)
        } catch (error) {
            console.log(error)
        }

    }

    const updateEvent = async (body, id) => {

        try {
            await update(body, id);
        } catch (error) {
            console.log(error)
        }

    }


    const navigate = useNavigate()
    const f = useFormik({
        initialValues: {
                name: '',
                description: '',
                price: 0,
                nbTickets: 0,
                img: '',
                nbParticipants: 0,
                like:false 
        },
        onSubmit: async (values) => {
            console.log(id)
            if(!id){
            await add(values);
            } else {
                updateEvent(values, id);
            }
            navigate('/events')
        }
    })

    

    return (<>
        <Form onSubmit={f.handleSubmit}>
            <Form.Group className="mb-3" >
                <Form.Label>Title</Form.Label>
                <Form.Control type="text" name="name" value={f.values.name} onChange={f.handleChange} />
              
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Description</Form.Label>
                <Form.Control as="textarea" type="text" name="description" value={f.values.description} onChange={f.handleChange} />
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Price</Form.Label>
                <Form.Control type="number" name="price" value={f.values.price} onChange={f.handleChange} />
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Number of Tickets</Form.Label>
                <Form.Control type="number" name="nbTickets" value={f.values.nbTickets} onChange={f.handleChange} />
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Image</Form.Label>
                <Form.Control type="text" name="img" value={f.values.img} onChange={f.handleChange} />
            </Form.Group>
           
            <Button variant="primary" type="submit">
                Submit
            </Button>
        </Form>
    </> );
}
export default FormEvent;