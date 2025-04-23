import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const Container = styled.div`
    padding: 30px;
    background-color:rgb(26, 38, 67);
    min-height: 100vh;
`;

const Title = styled.h2`
    text-align: center;
    margin-bottom: 30px;
    color: white;
`;

const AddCourseButton = styled.button`
    display: block;
    margin: 0 auto 20px auto;
    padding: 10px 20px;
    background-color: #4CAF50;
    color: white;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    font-size: 16px;
`;

const FormContainer = styled.div`
    background-color: #fff;
    border-radius: 12px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    padding: 20px;
    max-width: 600px;
    margin: 0 auto 30px auto;
    transition: all 0.3s ease-in-out;
`;

const Grid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
    gap: 20px;
`;

const CourseCard = styled.div`
    background-color: #fff;
    border-radius: 12px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    padding: 20px;
`;

const StyledForm = styled.form`
    display: flex;
    flex-direction: column;
    gap: 10px;
`;

const Input = styled.input`
    padding: 10px;
    border-radius: 8px;
    border: 1px solid #ccc;
`;

const Textarea = styled.textarea`
    padding: 10px;
    border-radius: 8px;
    border: 1px solid #ccc;
`;

const ButtonGroup = styled.div`
    display: flex;
    justify-content: space-between;
`;

const Button = styled.button`
    padding: 10px 20px;
    border-radius: 8px;
    border: none;
    cursor: pointer;
    color: white;
`;

const EditButton = styled(Button)`
    background-color: #2196F3;
`;

const DeleteButton = styled(Button)`
    background-color: #e91e63;
`;

const SaveButton = styled(Button)`
    background-color: #4CAF50;
`;

const CancelButton = styled(Button)`
    background-color: #f44336;
`;

const Iframe = styled.iframe`
    width: 100%;
    height: 200px;
    border-radius: 10px;
    margin-bottom: 10px;
`;

const ManageCourses = () => {
    const [courses, setCourses] = useState([]);
    const [editingId, setEditingId] = useState(null);
    const [editForm, setEditForm] = useState({ title: '', description: '', videoUrl: '', amount: '' });
    const [showAddForm, setShowAddForm] = useState(false);
    const [newCourse, setNewCourse] = useState({ title: '', description: '', videoUrl: '', amount: '' });

    const fetchCourses = async () => {
        const res = await axios.get('http://localhost:8080/courses');
        setCourses(res.data);
    };

    useEffect(() => {
        fetchCourses();
    }, []);

    const handleDelete = async (id) => {
        await axios.delete(`http://localhost:8080/courses/${id}`);
        alert("Deleted successfully");
        fetchCourses();
    };

    const startEdit = (course) => {
        setEditingId(course.id);
        setEditForm(course);
    };

    const handleEditChange = (e) => {
        setEditForm({ ...editForm, [e.target.name]: e.target.value });
    };

    const handleEditSubmit = async (e) => {
        e.preventDefault();
        await axios.put(`http://localhost:8080/courses/${editingId}`, editForm);
        setEditingId(null);
        fetchCourses();
        alert("Updated successfully");
    };

    const handleAddChange = (e) => {
        setNewCourse({ ...newCourse, [e.target.name]: e.target.value });
    };

    const handleAddSubmit = async (e) => {
        e.preventDefault();
        await axios.post('http://localhost:8080/courses', newCourse);
        setNewCourse({ title: '', description: '', videoUrl: '', amount: '' });
        setShowAddForm(false);
        fetchCourses();
        alert("Course added successfully");
    };

    return (
        <Container >
            <Title>Manage All Courses</Title>
            {/* <AddCourseButton onClick={() => setShowAddForm(!showAddForm)}>
                {showAddForm ? 'Close Form' : 'Add New Course'}
            </AddCourseButton> */}

            {/* {showAddForm && (
                <FormContainer>
                    <StyledForm onSubmit={handleAddSubmit}>
                        <Input name="title" value={newCourse.title} onChange={handleAddChange} required placeholder="Title" />
                        <Textarea name="description" value={newCourse.description} onChange={handleAddChange} required placeholder="Description" />
                        <Input name="videoUrl" value={newCourse.videoUrl} onChange={handleAddChange} required placeholder="Video URL" />
                        <Input name="amount" type="number" value={newCourse.amount} onChange={handleAddChange} required placeholder="Price" />
                        <SaveButton type="submit">Add Course</SaveButton>
                    </StyledForm>
                </FormContainer>
            )} */}

            <Grid>
                {courses.map((course) => (
                    <CourseCard key={course.id}>
                        {editingId === course.id ? (
                            <StyledForm onSubmit={handleEditSubmit}>
                                <Input name="title" value={editForm.title} onChange={handleEditChange} required placeholder="Title" />
                                <Textarea name="description" value={editForm.description} onChange={handleEditChange} required placeholder="Description" />
                                <Input name="videoUrl" value={editForm.videoUrl} onChange={handleEditChange} required placeholder="Video URL" />
                                <Input name="amount" type="number" value={editForm.amount} onChange={handleEditChange} required placeholder="Price" />
                                <ButtonGroup>
                                    <SaveButton type="submit">Save</SaveButton>
                                    <CancelButton type="button" onClick={() => setEditingId(null)}>Cancel</CancelButton>
                                </ButtonGroup>
                            </StyledForm>
                        ) : (
                            <>
                                <h3 style={{fontFamily:"revert-layer",fontStyle:"italic"}}>{course.title}</h3>
                                <p style={{fontFamily:"monospace",fontStyle:"-moz-initial"}}>{course.description}</p>
                                <Iframe
                                    src={course.videoUrl}
                                    title={course.title}
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                ></Iframe>
                                <p style={{ fontWeight: 'bold', fontSize: '18px', color: '#000' }}>Price ₹ {course.amount}</p>
                                <ButtonGroup>
                                    <EditButton onClick={() => startEdit(course)}>Edit</EditButton>
                                    <DeleteButton onClick={() => handleDelete(course.id)}>Delete</DeleteButton>
                                </ButtonGroup>
                            </>
                        )}
                    </CourseCard>
                ))}
            </Grid>
        </Container>
    );
};

export default ManageCourses;
