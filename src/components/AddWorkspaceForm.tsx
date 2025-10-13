"use client";

import { useAppState } from "@/context/appState";
import { CgClose } from "react-icons/cg";
import { roleType } from "@/types/newWorkspaceForm";
import { useState } from "react";
import { BsGithub } from "react-icons/bs";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { MdExpandMore } from "react-icons/md";

const AddWorkspaceForm = ({ email }: { email: string }) => {
  const defaultRole = {
    title: "Admin",
    color: "#00F2F2",
    members: [{ name: "You", email }],
    permissions: ["all_permissions"],
  };

  const appState = useAppState();

  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [created, setCreated] = useState(false);
  const [showRoleDetail, setShowRoleDetail] = useState(0);
  const [workspaceName, setWorkspaceName] = useState("");
  const [roles, setRoles] = useState<roleType[]>([defaultRole]);

  const resetForm = () => {
    setStep(1);
    setLoading(false);
    setError("");
    setCreated(false);
    setShowRoleDetail(0);
    setWorkspaceName("");
    setRoles([defaultRole]);

    appState?.setState.setShowAddWorkSpaceForm(false);
  };

  const handleClick = () => {
    setError("");
    setLoading(true);

    if (step === 3) {
      setLoading(false);
      resetForm();
    } else if (step === 2) {
      setLoading(false);
      setCreated(true);
      setStep(3);
    } else {
      if (!workspaceName) {
        setError("Please provide a name for your workspace");
        setLoading(false);
      } else {
        setLoading(false);
        setStep(2);
      }
    }
  };

  return (
    appState?.state.showAddWorkSpaceForm && (
      <div className="fixed flex h-full w-full items-center justify-center bg-neutral-950/20 backdrop-blur-2xl">
        <form className="relative w-[21rem] border-2 border-neutral-800 bg-neutral-950/70 text-white backdrop-blur-2xl">
          {loading && (
            <div className="animate-gradient absolute h-0.5 w-full bg-gradient-to-r from-transparent via-white to-transparent bg-[length:200%]"></div>
          )}

          <div className="flex items-center justify-between border-b-2 border-b-neutral-800 py-3">
            <h2 className="px-3 text-2xl font-bold">
              {step === 1
                ? "Name of the workspace"
                : step === 2
                  ? "Roles and Permissions"
                  : "Link GitHub account"}
            </h2>
            <button
              className="border-l-2 border-l-neutral-800 bg-neutral-950/50 px-3"
              type="reset"
              onClick={resetForm}
            >
              <CgClose />
            </button>
          </div>

          <div className="center flex-col p-9">
            {step === 1 ? (
              <input
                type="text"
                value={workspaceName}
                onChange={(e) => setWorkspaceName(e.target.value)}
                placeholder="Enter workspace name"
                className="border-b-2 border-b-neutral-800 text-xl outline-none sm:text-2xl"
              />
            ) : step === 2 ? (
              <div className="max-h-80 w-full overflow-x-hidden overflow-y-scroll">
                {roles.map((role, index) => (
                  <div
                    key={index}
                    className="grid w-full grid-cols-[1rem_1fr_auto] items-center gap-x-3 border-2 border-neutral-800 p-3"
                  >
                    <div
                      className="size-3.5 rounded-full"
                      style={{ backgroundColor: role.color }}
                    ></div>

                    <p className="w-3/4 text-lg">{role.title}</p>

                    <button
                      type="button"
                      onClick={() => setShowRoleDetail(index)}
                    >
                      <MdExpandMore
                        size={30}
                        className={`${showRoleDetail === index && "rotate-180 duration-300"}`}
                      />
                    </button>

                    {showRoleDetail === index && (
                      <>
                        <hr className="col-span-3 my-2" />

                        <p className="col-span-3 mb-2 text-center text-lg underline underline-offset-2">
                          Members
                        </p>
                        {
                          <div className="col-span-3">
                            {role.members.map((member, index) => (
                              <p
                                key={index}
                                className="w-56 truncate"
                              >{`${member.email}(${member.name})`}</p>
                            ))}
                          </div>
                        }

                        <hr className="col-span-3 my-2" />

                        <p className="col-span-3 mb-2 text-center text-lg underline underline-offset-2">
                          Permissions
                        </p>
                        <div>
                          {role.permissions.map((permission, index) => {
                            switch (permission) {
                              case "all_permissions":
                                return (
                                  <p key={index} className="w-56 truncate">
                                    All permission
                                  </p>
                                );
                              case "read_only":
                                return (
                                  <p key={index} className="w-56 truncate">
                                    Read only
                                  </p>
                                );
                            }
                          })}
                        </div>
                      </>
                    )}

                    {showRoleDetail === index && (
                      <div className="col-span-3"></div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <button
                type="button"
                className="center gap-3 bg-white px-3 py-2 text-2xl text-neutral-950"
              >
                <BsGithub /> Link
              </button>
            )}
          </div>

          {step === 2 && (
            <button
              type="button"
              className="mx-[10%] mb-2 w-4/5 border-2 border-white px-3 py-2 text-sm"
            >
              Add role
            </button>
          )}

          {error && (
            <p className="border-t-2 border-t-red-500 bg-red-500/10 px-2 py-3 text-center text-sm">
              {error}
            </p>
          )}

          <div className="center gap-3 border-t-2 border-t-neutral-800 p-5">
            {!created && (
              <button
                className="center w-28 gap-3 border-2 border-white px-3 py-1 font-bold duration-300 hover:gap-1 disabled:opacity-50 disabled:hover:gap-3 sm:text-lg"
                type="button"
                disabled={step < 2 || loading}
                onClick={() => setStep(step - 1)}
              >
                <FaArrowLeft size={17} /> Back
              </button>
            )}

            <button
              className="center w-28 gap-3 bg-white px-3 py-1 font-bold text-neutral-950 duration-300 hover:gap-1 disabled:opacity-50 disabled:hover:gap-3 sm:text-lg"
              type="button"
              disabled={loading}
              onClick={handleClick}
            >
              <FaArrowRight size={17} />
              {step === 3 ? "Finish" : step === 2 ? "Create" : "Next"}
            </button>
          </div>
        </form>
      </div>
    )
  );
};

export default AddWorkspaceForm;
