import { useState } from "react"
import { useApi } from "../../contexts/ApiContext";
import { useUser } from "../../contexts/UserContext";
import { useValidation } from "../../contexts/ValidationContext";

export default function CourseSettings({ coursesSet, coursesSetter }) {
    const { user } = useUser();
    const { apiRequest } = useApi();
    const { validateArrayFields } = useValidation();
    const [courses, setCourses] = useState(coursesSet ? coursesSet : []);
    const [newCourses, setNewCourses] = useState([]);
    const [coursesToDelete, setCoursesToDelete] = useState([]);
    const [coursesErrors, setCoursesErrors] = useState([[], false]);
    const [newCoursesErrors, setNewCoursesErrors] = useState([[], false]);

}