import axios from "axios";
import Swal from "sweetalert2";
import { apiUrl } from "../config/config";
import { getToken } from "../helpers";

const url = `${apiUrl}/jobs`;

const readJob = async (cb) => {
  try {
    const result = await axios.get(`${url}/?`);

    // console.log(result);
    cb(result.data);
  } catch (error) {
    console.log(error);
  }
};

const readJobDetail = async (id, cb) => {
  try {
    const result = await axios.get(`${url}/${id}`);

    // console.log(result);
    cb(result.data);
  } catch (error) {
    console.log(error);
  }
};

const createJob = async (data, cb) => {
  try {
    await axios.postForm(url, data, {
      headers: { Authorization: getToken() },
    });

    Swal.fire("Success", "Job has been added", "success").then(() => {
      cb(true);
    });
  } catch (error) {
    // console.log(error);
    Swal.fire("Failed", "Failed to create job", "error");
  }
};

const deleteJob = async (id, cb) => {
  try {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await axios.delete(`${url}/${id}`, {
          headers: { Authorization: getToken() },
        });

        Swal.fire("Deleted!", "Job has been deleted.", "success").then(() => {
          cb(true);
        });
      }
    });
  } catch (error) {
    console.log(error);
    Swal.fire("Failed", "Failed to delete job", "error");
  }
};

const updateJob = async (id, data, cb) => {
  try {
    const result = await axios.putForm(`${url}/${id}`, data, {
      headers: { Authorization: getToken() },
    });

    console.log(result);
    Swal.fire("Success", "Succesfully updated the job", "success").then(() => {
      cb(true);
    });
  } catch (error) {
    console.log(error);
    Swal.fire("Failed", "Failed to update job", "error");
  }
};

export { readJob, readJobDetail, createJob, updateJob, deleteJob };
