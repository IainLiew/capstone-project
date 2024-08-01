import { storage, db } from "../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { doc, updateDoc, getDoc } from "firebase/firestore";
import { useState, useContext, useEffect } from "react";
import { AuthContext } from "./AuthProvider";
import { updateProfile } from "firebase/auth";
import { Container, Row, Col, Button } from "react-bootstrap";
import { CgProfile } from "react-icons/cg";
import { FaEdit } from "react-icons/fa";
import { toast } from "react-toastify";

export default function UserProfile() {
    const { currentUser } = useContext(AuthContext);
    const [changeDetail, setChangeDetail] = useState(false);
    const [loading, setLoading] = useState(true);

    const [formData, setFormData] = useState({ username: currentUser.displayName, email: currentUser.email });
    const { username, email } = formData;
    const [imagePreview, setImagePreview] = useState(null);
    const [imageChange, setImageChange] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);

    useEffect(() => {
        const fetchUserDetails = async () => {
            setLoading(true);
            try {
                const docRef = doc(db, "users", currentUser.uid);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    const data = docSnap.data();
                    setFormData((prevState) => ({
                        ...prevState,
                        username: data.username,
                    }));
                }
            } catch (error) {
                toast.error("Failed to fetch user data");
            } finally {
                setLoading(false);
            }
        };

        fetchUserDetails();
    }, [currentUser]);

    const handleImageChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onloadend = () => {
            setImagePreview(reader.result);
            setImageChange(true);
        };
        reader.readAsDataURL(file);
    };

    const uploadProfilePic = async (file) => {
        const imageRef = ref(storage, `images/${currentUser.uid}`);
        const response = await uploadBytes(imageRef, file);
        const imageUrl = await getDownloadURL(response.ref);
        return imageUrl;
    };

    const editUsername = (e) => {
        setFormData((prevState) => ({
            ...prevState, [e.target.id]: e.target.value,
        }));
    };

    const submitChanges = async () => {
        try {
            setLoading(true);
            if (!username.trim()) {
                toast.error("Please add a username.");
                return;
            }

            let updatedImageUrl = currentUser.photoURL;
            if (imageChange && imagePreview) {
                const file = await fetch(imagePreview).then(r => r.blob());
                updatedImageUrl = await uploadProfilePic(file);
            }

            await updateProfile(currentUser, {
                displayName: username,
                photoURL: updatedImageUrl,
            });

            const docRef = doc(db, "users", currentUser.uid);
            await updateDoc(docRef, { username: username, imageUrl: updatedImageUrl });
            toast.success("Profile updated!");
        } catch (error) {
            toast.error("Failed to update profile");
        } finally {
            setLoading(false);
            setImageChange(false);
            setImagePreview(null);
        }
    };

    const handlePictureUpload = () => {
        document.getElementById('fileInput').click();
    };

    return (
        <>
            <div style={{ backgroundColor: 'white', minHeight: '100vh', color: 'white' }}>
                <Container>
                    <Row>
                        <Col md={6} className="d-flex flex-column align-items-center mt-5 mb-4">
                            <input
                                type="file"
                                id="fileInput"
                                className="d-none"
                                onChange={handleImageChange}
                                accept=".jpeg, .png, .jpg"
                                disabled={!changeDetail}
                            />
                            <div className="d-flex justify-content-center">
                                <div
                                    className="position-relative"
                                    style={{ width: '400px', height: '400px' }}
                                    onClick={handlePictureUpload}
                                >
                                    {imagePreview ?
                                        <img src={imagePreview} className="w-100 h-100 object-fit-cover" alt="Profile Preview" style={{ padding: '30px' }} />
                                        : currentUser.photoURL ? (
                                            <img src={currentUser.photoURL} className="w-100 h-100 object-fit-cover" alt="Profile" style={{ padding: '30px' }} />
                                        ) : (
                                            <CgProfile className="w-full h-full object-cover group-hover:opacity-50 transition-opacity duration-300" />
                                        )
                                    }
                                    {imageChange && uploadProgress > 0 && uploadProgress < 100 && (
                                        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                                            <span className="text-white">{Math.round(uploadProgress)}%</span>
                                        </div>
                                    )}
                                    {changeDetail && (
                                        <div className="position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center bg-dark bg-opacity-50">
                                            <span className="text-white fs-5">Upload Profile Pic</span>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <Container style={{ paddingTop: '20px' }}>
                                <Row>
                                    <Col className="d-flex justify-content-center">
                                        <form>
                                            <input type="text"
                                                id="username"
                                                value={username}
                                                disabled={!changeDetail}
                                                onChange={editUsername}
                                                className={`w-full px-4 py-2 text-xl text-gray-700 border border-gray-400 
          rounded transition ease-in-out mb-5 ${changeDetail && "bg-red-300 focus:bg-red-300"
                                                    }`}
                                            />
                                            <input type="email" id="email" value={email} disabled
                                                className="w-full px-4 py-2 text-xl text-gray-700 border 
              border-gray-400 rounded transition ease-in-out mb-5"
                                            />

                                            <div className="flex justify-between whitespace-nowrap text-sm sm:text-lg mb-6">
                                                <Button
                                                    onClick={() => {
                                                        changeDetail && submitChanges();
                                                        setChangeDetail((prevState) => !prevState);
                                                    }}
                                                    className="flex items-center space-x-1 text-red-500 hover:text-red-700 transition ease-in-out duration-200 cursor-pointer"

                                                >
                                                    {changeDetail ? "Apply change" : "Edit profile"} <FaEdit className="ml-2" />

                                                </Button>

                                            </div>
                                        </form>
                                    </Col>
                                </Row>
                            </Container>
                        </Col>
                    </Row>
                </Container>
            </div>
        </>
    );
}

