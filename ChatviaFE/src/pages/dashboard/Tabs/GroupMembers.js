import React from 'react';
import { Table, Button } from 'reactstrap';

const GroupMembers = ({ members, onDeleteMember }) => {
  return (
    <div className="mt-4">
      <h5>Group Members</h5>
      <Table responsive>
        <thead className="text-primary">
          <tr>
            <th className="text-center">#</th>
            <th className="text-center">Member Name</th>
            <th className="text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {members.length > 0 ? (
            members.map((member, index) => (
              <tr key={member.id}>
                <td className="text-center">{index + 1}</td>
                <td className="text-center">{member.name}</td>
                <td className="text-center">
                  <Button
                    color="danger"
                    size="sm"
                    onClick={() => onDeleteMember(member.id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3" className="text-center">
                No members in this group.
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  );
};

export default GroupMembers;
