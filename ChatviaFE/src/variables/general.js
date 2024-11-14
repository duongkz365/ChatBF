
const thead = ["Stt","Id","Name", "Status","Date", "Action"];
  const tbody = [
    {
      
      data: ["1","abc123","Dakota Rice", 
          <div className="Status_Online Status_Offline" >
            offline
          </div>,"Oud-Turnhout", 
          <div>
            <button className="ri ri-edit-2-line"
            style={{ color: 'blue' }} 
          
           >
            </button>
            <button className="ri ri-delete-bin-2-line" 
            style={{  color: 'red' }}
            
           > 
            </button>
            <button className="ri ri-close-circle-line" 
            style={{ color: 'red' }}
            > 
            </button>
          </div>
        
      ],
    },
    
  ];
  const blockUser = ["Stt","Id","Name","Date", "Action"];
  const dbBlockUser = [
    {
      
      data: ["1","abc123","Dakota Rice", 
          ,"22/5", 
          <div>
            {/* <button className="ri ri-edit-2-line"
            style={{ color: 'blue' }} 
           >
            </button> */}
            <button className="ri ri-delete-bin-2-line" 
            style={{  color: 'red' }}
           > 
            </button>
            <button className="ri ri-add-line" 
            style={{ color: 'green' }}
            > 
            </button>
          </div>
        
      ],
    },
    
  ];
  const Group = ["Stt","Id","Name","Date", "Action"];
  const dbGroup = [
    {
      
      data: ["1","Group1","Dakota Rice", 
         ,"22/5", 
          <div>
            <button className="ri ri-edit-2-line"
            style={{ color: 'blue' }} 
           >
            </button>
            <button className="ri ri-delete-bin-2-line" 
            style={{  color: 'red' }}
           > 
            </button>
            {/* <button className="ri ri-close-circle-line" 
            style={{ color: 'red' }}
            > 
            </button> */}
          </div>
        
      ],
    },
    
  ];const Message = ["Stt","Id","Date", "Action"];
  const dbMessage = [
    {
      
      data: ["1","Group1", 
         ,"22/5", 
          <div>
            <button className="ri ri-eye-line"
            style={{ color: 'gray' }} 
           >
            </button>
            <button className="ri ri-delete-bin-2-line" 
            style={{  color: 'red' }}
           > 
            </button>
            {/* <button className="ri ri-close-circle-line" 
            style={{ color: 'red' }}
            > 
            </button> */}
          </div>
        
      ],
    },
    
  ];
 
  
  
  

  export { thead, tbody, blockUser,dbBlockUser, Group, dbGroup, Message, dbMessage};
  
  