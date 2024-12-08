import React, { useEffect, useState } from "react";
import { withTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  Input,
  InputGroup,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "reactstrap";
import SimpleBar from "simplebar-react";
import SelectContact from "../../../components/SelectContact";
import {
  CreateGroupRequest,
  fetchGroupRequest,
  deleteGroupRequest,
  // updateGroupRequest, // Import the update group action
} from "../../../redux/groups/action";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Groups = ({ t }) => {
  const dispatch = useDispatch();
  const [modal, setModal] = useState(false); // Modal for creating a group
  const [updateModal, setUpdateModal] = useState(false); // Modal for updating a group
  const [selectedContact, setSelectedContact] = useState([]); // Selected members
  const [groupName, setGroupName] = useState(""); // Group name
  const [groupDesc, setGroupDesc] = useState(""); // Group description
  const [selectedGroup, setSelectedGroup] = useState(null); // Selected group for editing
  const groups = useSelector((state) => state.Group.group || []); // Groups from Redux

  const toggle = () => setModal(!modal);
  const toggleUpdateModal = () => setUpdateModal(!updateModal);

  useEffect(() => {
    dispatch(fetchGroupRequest());
  }, [dispatch]);

  const handleCheck = (e, contactId) => {
    const newSelected = [...selectedContact];
    if (e.target.checked) {
      newSelected.push({ id: contactId, name: e.target.value });
    } else {
      const index = newSelected.findIndex((contact) => contact.id === contactId);
      if (index !== -1) newSelected.splice(index, 1);
    }
    setSelectedContact(newSelected);
  };

  const createGroupHandler = async () => {
    if (selectedContact.length < 1) {
      toast.error("Minimum 1 member required!");
      return;
    }

    try {
      const newGroup = {
        groupId: groups.length + 1,
        name: groupName,
        desc: groupDesc,
        members: selectedContact,
      };

      dispatch(CreateGroupRequest(newGroup));
      toast.success("Group created successfully!");
      toggle();
    } catch (error) {
      toast.error("Failed to create group!");
    }
  };

  const openUpdateModal = (group) => {
    setSelectedGroup(group);
    setSelectedContact(group.members || []); // Set existing members
    setGroupName(group.name || "");
    setGroupDesc(group.description || "");
    toggleUpdateModal();
  };

  const updateGroupHandler = () => {
    if (!selectedGroup) return;

    // Avoid duplicate members
    const updatedMembers = [
      ...new Map(
        [...selectedGroup.members, ...selectedContact].map((member) => [
          member.id,
          member,
        ])
      ).values(),
    ];

    const updatedGroup = {
      ...selectedGroup,
      name: groupName,
      desc: groupDesc,
      members: updatedMembers, // Updated members list
    };

    // Dispatch the update action
    // dispatch(updateGroupRequest(updatedGroup));
    toast.success("Group updated successfully!");
    toggleUpdateModal();
  };

  const isMemberSelected = (memberId) => {
    return selectedContact.some((member) => member.id === memberId);
  };

  return (
    <React.Fragment>
      <ToastContainer />
      <style>
        {`
          .group-item {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 16px;
            border: 1px solid #f1f1f1;
            border-radius: 8px;
            background: #fff;
            margin-bottom: 12px;
            transition: all 0.3s ease;
          }
          .group-item:hover {
            background: #f9f9f9;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          }
          .group-details {
            display: flex;
            align-items: center;
          }
          .group-icon {
            width: 50px;
            height: 50px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 20px;
            color: #fff;
            background: #007bff;
            border-radius: 50%;
            margin-right: 12px;
          }
          .group-info h5 {
            margin: 0;
            font-size: 1rem;
            font-weight: bold;
          }
          .group-info small {
            display: block;
            color: #6c757d;
            margin-top: 4px;
          }
          .group-info p {
            margin: 0;
            margin-top: 6px;
            font-size: 0.85rem;
            color: #6c757d;
          }
        `}
      </style>
      {/* Header */}
      <div className="p-4">
        <div className="d-flex justify-content-between align-items-center">
          <h4 className="mb-0">{t("Groups")}</h4>
          <Button color="primary" onClick={toggle}>
            <i className="ri-group-line me-2"></i> {t("Create Group")}
          </Button>
        </div>

        {/* Search Box */}
        <div className="search-box chat-search-box mt-3">
          <InputGroup size="lg" className="bg-light rounded-lg">
            <Button
              color="link"
              className="text-decoration-none text-muted pr-1"
            >
              <i className="ri-search-line search-icon font-size-18"></i>
            </Button>
            <Input
              type="text"
              className="form-control bg-light"
              placeholder={t("Search groups...")}
            />
          </InputGroup>
        </div>
      </div>

      {/* Group List */}
      <SimpleBar className="p-4 chat-message-list chat-group-list">
        <ul className="list-unstyled">
          {groups.length > 0 ? (
            groups.map((group, key) => (
              <li
                key={group.groupId || key}
                className="group-item"
                onClick={() => openUpdateModal(group)}
              >
                <div className="group-details">
                  <div className="group-icon">
                    {group.name.charAt(0).toUpperCase()}
                  </div>
                  <div className="group-info">
                    <h5>{group.name}</h5>
                    <small>{group.members?.length || 0} Members</small>
                    <p>{group.description || "No description available"}</p>
                  </div>
                </div>
                <Button
                  color="danger"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    dispatch(deleteGroupRequest(group.name));
                    toast.success("Group deleted successfully!");
                  }}
                >
                  {t("Delete")}
                </Button>
              </li>
            ))
          ) : (
            <li className="text-center text-muted">{t("No groups found")}</li>
          )}
        </ul>
      </SimpleBar>

      {/* Create Group Modal */}
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>{t("Create New Group")}</ModalHeader>
        <ModalBody>
          <Label>{t("Group Name")}</Label>
          <Input
            type="text"
            className="mb-3"
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
          />
          <Label>{t("Description")}</Label>
          <Input
            type="textarea"
            className="mb-3"
            value={groupDesc}
            onChange={(e) => setGroupDesc(e.target.value)}
          />
          <Label>{t("Select Members")}</Label>
          <SimpleBar className="border p-2" style={{ maxHeight: "150px" }}>
            <SelectContact
              handleCheck={handleCheck}
              isSelected={(memberId) => isMemberSelected(memberId)}
            />
          </SimpleBar>
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={toggle}>
            {t("Cancel")}
          </Button>
          <Button color="primary" onClick={createGroupHandler}>
            {t("Create Group")}
          </Button>
        </ModalFooter>
      </Modal>

      {/* Update Group Modal */}
      <Modal isOpen={updateModal} toggle={toggleUpdateModal}>
        <ModalHeader toggle={toggleUpdateModal}>
          {t("Update Group")} - {selectedGroup?.name}
        </ModalHeader>
        <ModalBody>
          <Label>{t("Group Name")}</Label>
          <Input
            type="text"
            className="mb-3"
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
          />
          <Label>{t("Description")}</Label>
          <Input
            type="textarea"
            className="mb-3"
            value={groupDesc}
            onChange={(e) => setGroupDesc(e.target.value)}
          />
          <Label>{t("Group Members")}</Label>
          <SimpleBar className="border p-2" style={{ maxHeight: "150px" }}>
            <SelectContact
              handleCheck={handleCheck}
              isSelected={isMemberSelected}
            />
          </SimpleBar>
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={toggleUpdateModal}>
            {t("Cancel")}
          </Button>
          <Button color="primary" onClick={updateGroupHandler}>
            {t("Save Changes")}
          </Button>
        </ModalFooter>
      </Modal>
    </React.Fragment>
  );
};

export default withTranslation()(Groups);
