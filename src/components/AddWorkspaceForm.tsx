"use client";

import { useAppState } from "@/context/appState";
import { CgClose } from "react-icons/cg";
import React, { useState } from "react";
import { BsGithub } from "react-icons/bs";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { MdExpandMore } from "react-icons/md";
import addWorkspace from "@/actions/addWorkspace";
import { roleType } from "@/types/workspace";

const AddWorkspaceForm = ({ email }: { email: string }) => {
  const permissions = [
    { name: "Create PR", id: "create_pr" },
    { name: "Create Issue", id: "create_issue" },
    { name: "Commend on issue", id: "comment_on_issue" },
    { name: "Connect Github", id: "connect_github" },
  ];

  const defaultRole = {
    title: "Admin",
    color: "#00F2F2",
    members: [email],
    permissions: permissions.map((perm) => perm.id),
  };

  const appState = useAppState();

  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [created, setCreated] = useState(false);
  const [showAddRoleForm, setShowAddRoleForm] = useState(false);
  const [roleName, setRoleName] = useState("");
  const [roleColor, setRoleColor] = useState("#131577");
  const [member, setMember] = useState("");
  const [members, setMembers] = useState<string[]>([]);
  const [selectedPermissions, setSelectedPermissions] = useState<string[]>([]);
  const [showRoleDetail, setShowRoleDetail] = useState(0);
  const [workspaceName, setWorkspaceName] = useState("");
  const [roles, setRoles] = useState<roleType[]>([defaultRole]);

  const resetAddRoleForm = () => {
    setRoleName("");
    setRoleColor("#134577");
    setMember("");
    setMembers([]);
    setError("");
    setSelectedPermissions([]);
  };

  const resetForm = () => {
    resetAddRoleForm();
    setStep(1);
    setLoading(false);
    setError("");
    setCreated(false);
    setShowAddRoleForm(false);
    setShowRoleDetail(0);
    setWorkspaceName("");
    setRoles([defaultRole]);
    appState?.setState.setShowAddWorkSpaceForm(false);
  };

  const addMember = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const trimmed = member.trim();

      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (regex.test(trimmed)) {
        if (!members.includes(trimmed)) {
          setMembers([...members, trimmed]);
          setMember("");
        }
      }
    }
  };

  const addRole = () => {
    if (!roleName) {
      setError("Missing name");
    } else if (members.length === 0) {
      setError("Assign at least one member");
    } else if (selectedPermissions.length === 0) {
      setError("Set at least one permission");
    } else {
      const newRole = {
        title: roleName,
        color: roleColor,
        members,
        permissions: selectedPermissions,
      };

      setError("");
      setRoles([...roles, newRole]);
      resetAddRoleForm();
      setShowAddRoleForm(false);
    }
  };

  const handleNext = async (
    e: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>,
  ) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (step === 3) {
      setLoading(false);
      resetForm();
    } else if (step === 2) {
      const newWorkspace = {
        workspaceName,
        roles,
      };

      await addWorkspace(JSON.stringify(newWorkspace));

      setCreated(true);
      setLoading(false);
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
      <div className="fixed z-40 flex h-full w-full items-center justify-center bg-neutral-950/20 backdrop-blur-2xl">
        <form
          onSubmit={handleNext}
          className="relative w-[21rem] border-2 border-neutral-800 bg-neutral-950/70 text-white backdrop-blur-2xl"
        >
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

          {step === 1 ? (
            <input
              type="text"
              value={workspaceName}
              onChange={(e) => setWorkspaceName(e.target.value)}
              placeholder="Enter workspace name"
              className="m-5 border-b-2 border-b-neutral-800 text-xl outline-none sm:text-2xl"
            />
          ) : step === 2 ? (
            !showAddRoleForm && (
              <div className="m-3 max-h-80 overflow-x-hidden overflow-y-scroll">
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
                              <p key={index} className="w-56 truncate">
                                {member}
                              </p>
                            ))}
                          </div>
                        }

                        <hr className="col-span-3 my-2" />

                        <p className="col-span-3 mb-2 text-center text-lg underline underline-offset-2">
                          Permissions
                        </p>
                        <div>
                          {permissions.map((perm) =>
                            role.permissions.map(
                              (rolePerm) =>
                                perm.id === rolePerm && (
                                  <p key={index} className="w-56 truncate">
                                    {perm.name}
                                  </p>
                                ),
                            ),
                          )}
                        </div>
                      </>
                    )}

                    {showRoleDetail === index && (
                      <div className="col-span-3"></div>
                    )}
                  </div>
                ))}
              </div>
            )
          ) : (
            <button
              type="button"
              className="center m-5 gap-3 bg-white px-3 py-2 text-2xl text-neutral-950"
            >
              <BsGithub /> Link
            </button>
          )}

          {step === 2 &&
            (showAddRoleForm ? (
              <div className="center m-3 flex-col gap-2 border-2 border-neutral-800 px-10 py-5">
                <input
                  type="text"
                  placeholder="Role name"
                  value={roleName}
                  onChange={(e) => setRoleName(e.target.value)}
                  className="border-2 border-neutral-800/50 px-3 py-1"
                />

                <div className="flex gap-2">
                  <label htmlFor="role_color">Select role color : </label>
                  <input
                    type="color"
                    id="role_color"
                    className="w-5"
                    value={roleColor}
                    onChange={(e) => setRoleColor(e.target.value)}
                  />
                </div>

                <div className="w-full">
                  <p>Add members</p>

                  <input
                    className="w-full border-2 border-b-0 border-neutral-800/50 px-3 py-1"
                    type="email"
                    value={member}
                    placeholder="Member's Email"
                    onChange={(e) => setMember(e.target.value)}
                    onKeyDown={addMember}
                  />

                  <div className="max-h-32 overflow-scroll border-2 border-neutral-800/50 p-1">
                    {members.map((member, index) => (
                      <p key={index} className="flex items-center gap-1">
                        <button
                          type="button"
                          onClick={() => {
                            setMembers((prev) =>
                              prev.filter((_, i) => i !== index),
                            );
                          }}
                        >
                          <CgClose />
                        </button>
                        {member}
                      </p>
                    ))}
                  </div>
                </div>

                <div className="w-full">
                  <p>Select permissions</p>

                  <div className="max-h-32 w-full overflow-scroll border-2 border-neutral-800 px-2 py-1">
                    {permissions.map((perm, index) => (
                      <div key={index} className="flex items-center gap-1">
                        <input
                          type="checkbox"
                          id={index.toString()}
                          onChange={(e) =>
                            e.target.checked
                              ? setSelectedPermissions([
                                  ...selectedPermissions,
                                  perm.id,
                                ])
                              : setSelectedPermissions((prev) =>
                                  prev.filter(
                                    (existingPerm) => existingPerm !== perm.id,
                                  ),
                                )
                          }
                        />
                        <label htmlFor={index.toString()}>{perm.name}</label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="center gap-3">
                  <button
                    type="button"
                    className="border-2 border-white px-3 py-1"
                    onClick={() => {
                      resetAddRoleForm();
                      setShowAddRoleForm(false);
                    }}
                  >
                    cancel
                  </button>
                  <button
                    onClick={addRole}
                    type="button"
                    className="bg-white px-3 py-1 font-bold text-neutral-950"
                  >
                    Add Role
                  </button>
                </div>
              </div>
            ) : (
              <button
                type="button"
                className="mx-[10%] mb-2 w-4/5 border-2 border-white px-3 py-2 text-sm"
                onClick={() => setShowAddRoleForm(true)}
              >
                Add role
              </button>
            ))}

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
              onClick={handleNext}
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
