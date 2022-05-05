import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import jobSites from "../data/jobSites.json"
export const AddJob = () => {
  const [formData, setFormData] = useState({});
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({ defaultValues: { skills: "HTML, CSS, JS, REACT" } });

  useEffect(() => {
    const position = watch("position");
    if (position === "/r") {
      setValue("position", "Front React Developer");
      setValue("skills", "REACT,JS,CSS,HTML");
    }
  }, [watch("position")]);

  return (
    <div className="page_addJob">
      <h3>Find Jobs:</h3>
      <ul className="jobSites">
        {jobSites.map((jobSite, index) => {
          return (
            <li key={index}>
              <a target="_blank" href={jobSite.url}>
                {jobSite.name}
              </a>
            </li>
          );
        })}
      </ul>
      <h3>Add a Job:</h3>
      <div className="App">
        <form
          onSubmit={handleSubmit((data) => {
            setFormData(data);
          })}
        >
          <div className="row">
            <input
              className="field_position"
              type="text"
              {...register("position", {
                required: "Please enter a position.",
                minLength: {
                  value: 4,
                  message: "You need to have 4 characters",
                },
              })}
              placeholder="Position"
            />
            <div className="info">{errors.position?.message}</div>
          </div>
          <div className="row">
            <textarea
              className="field_bulkText"
              {...register("bulkText", {
                required:
                  "Please copy the job text from the job site and paste it in here",
              })}
              placeholder="Copy and paste text here from the job site"
            />
            <div className="info">{errors.bulkText?.message}</div>

          </div>
          <button disabled={Object.keys(errors).length}>Add the job</button>
          {Object.keys(formData).length>0 && (
            <div className="formData">
              <div className="info">This will be sent to the backend:</div>
              <pre>{JSON.stringify(formData, null, 2)}</pre>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};
