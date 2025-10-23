import React from "react";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const File = ({ ObjId }) => {
  const [file, setFile] = useState(null);
  const [url, setUrl] = useState(null);
  const handleSubmit = (e) => {
    e.preventDefault();
    const formdata = new FormData();
    formdata.append("file", file);
    formdata.append("fileid", ObjId);
    const submit = async () => {
      try {
        const result = await axios.post(
          "http://localhost:3000/upload",
          formdata
        );
        // console.log(result);
        if (!result.data.ok) throw Error(result.data.msg);
        toast.success(result.data.msg);
        setUrl(result.data.url);
      } catch (err) {
        toast.error(err.message);
      }
    };
    submit();
  };
  return (
    <div>
      <input type="file" onChange={(e) => setFile(e.target.files[0])} />
      <button
        className="bg-blue-500 rounded-md p-2 font-semibold text-rose-50"
        onClick={handleSubmit}
      >
        Upload
      </button>
    </div>
  );
};

export default File;
