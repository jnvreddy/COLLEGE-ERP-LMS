import { useSelector, useDispatch } from 'react-redux';
import { useRef, useState, useEffect } from 'react';
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';
import { app } from '../../firebase';
import {
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
  signOut,
} from '../../redux/user/userSlice';

export default function FacultyProfile() {
  const dispatch = useDispatch();
  const fileRef = useRef(null);
  const [image, setImage] = useState(undefined);
  const [imagePercent, setImagePercent] = useState(0);
  const [imageError, setImageError] = useState(false);
  const [formData, setFormData] = useState({});
  const [updateSuccess, setUpdateSuccess] = useState(false);

  const { currentUser, loading, error } = useSelector((state) => state.user);

  useEffect(() => {
    if (image) {
      handleFileUpload(image);
    }
  }, [image]);

  const handleFileUpload = async (image) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + image.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, image);
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setImagePercent(Math.round(progress));
      },
      (error) => {
        setImageError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
          setFormData({ ...formData, profilePicture: downloadURL })
        );
      }
    );
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!currentUser) {
      console.error('currentUser is null');
      return;
    }
    try {
      dispatch(updateUserStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(updateUserFailure(data));
        return;
      }
      dispatch(updateUserSuccess(data));
      setUpdateSuccess(true);
    } catch (error) {
      dispatch(updateUserFailure(error));
    }
  };

  const handleSignOut = async () => {
    try {
      await fetch('/api/auth/signout');
      dispatch(signOut());
      window.location.href = '/login';
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="file"
          ref={fileRef}
          hidden
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
        />
        <div className="flex justify-center mb-4">
          <img
            src={formData.profilePicture || currentUser.profilePicture}
            alt="profile"
            className="h-32 w-32 cursor-pointer rounded-full object-cover border-2 border-gray-300"
            onClick={() => fileRef.current.click()}
          />
        </div>
        <p className="text-sm text-center">
          {imageError ? (
            <span className="text-red-700">
              Error uploading image (file size must be less than 2 MB)
            </span>
          ) : imagePercent > 0 && imagePercent < 100 ? (
            <span className="text-slate-700">{`Uploading: ${imagePercent} %`}</span>
          ) : imagePercent === 100 ? (
            <span className="text-green-700">Image uploaded successfully</span>
          ) : (
            ''
          )}
        </p>

        <div className="grid grid-cols-1 gap-6">
          <div className="col-span-1">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="email"
              id="email"
              defaultValue={currentUser.email}
              className="block w-full mt-1 p-2 border border-gray-300 rounded-md"
              onChange={handleChange}
            />
          </div>
          <div className="col-span-1">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="block w-full mt-1 p-2 border border-gray-300 rounded-md"
              onChange={handleChange}
            />
          </div>
          <div className="col-span-1">
            <label htmlFor="address" className="form-label">
              Address
            </label>
            <input
              type="text"
              id="address"
              placeholder="1234 Main St"
              className="block w-full mt-1 p-2 border border-gray-300 rounded-md"
              onChange={handleChange}
            />
          </div>
          <div className="col-span-1">
            <label htmlFor="address2" className="form-label">
              Address 2
            </label>
            <input
              type="text"
              id="address2"
              placeholder="Apartment, studio, or floor"
              className="block w-full mt-1 p-2 border border-gray-300 rounded-md"
              onChange={handleChange}
            />
          </div>
          <div className="col-span-1">
            <label htmlFor="city" className="form-label">
              City
            </label>
            <input
              type="text"
              id="city"
              className="block w-full mt-1 p-2 border border-gray-300 rounded-md"
              onChange={handleChange}
            />
          </div>
          <div className="col-span-1">
            <label htmlFor="state" className="form-label">
              State
            </label>
            <select
              id="state"
              className="block w-full mt-1 p-2 border border-gray-300 rounded-md"
              onChange={handleChange}
            >
              <option value="">Choose...</option>
              <option value="...">...</option>
            </select>
          </div>
          <div className="col-span-1">
            <label htmlFor="zip" className="form-label">
              Zip
            </label>
            <input
              type="text"
              id="zip"
              className="block w-full mt-1 p-2 border border-gray-300 rounded-md"
              onChange={handleChange}
            />
          </div>
          <div className="col-span-1 flex items-center">
            <input
              className="form-check-input mr-2"
              type="checkbox"
              id="check"
              onChange={handleChange}
            />
            <label className="form-check-label" htmlFor="check">
              Check me out
            </label>
          </div>
          <div className="col-span-1">
            <button
              type="submit"
              className="block w-full bg-blue-600 text-white p-3 rounded-md hover:bg-blue-700 disabled:opacity-80"
              disabled={loading}
            >
              {loading ? 'Loading...' : 'Update'}
            </button>
          </div>
        </div>
      </form>
      <div className="flex justify-between mt-5">
        <button
          onClick={handleSignOut}
          className="block w-full bg-red-700 text-white p-3 rounded-md"
        >
          Sign out
        </button>
      </div>
      <p className="text-red-700 mt-5">{error && 'Something went wrong!'}</p>
      <p className="text-green-700 mt-5">
        {updateSuccess && 'User is updated successfully!'}
      </p>
    </div>
  );
}
