export interface IBaseSqlRepository<T>{
    /**
     * Function to add the item
     * 
     * @param item The item
     * @param userId The user identifier.
     * @returns id the add item
     */
    AddAsync(item: T, userId: string)

    /**
     * Update the item
     * 
     * @param item The item
     * @param userId The user identifier
     * @returns the updated item 
     */
    UpdateAsync(item: T, userId: string)

    /**
     * Delete the item
     * 
     * @param id The identifier
     * @param userId The userIdentifier
     * @returns true if operation succeeded. False otherwise. 
     */
    DeleteAsync(id: string, userId: string)

    /**
     * Gets the object by id.
     * 
     * @param id The identifier
     * @returns The object
     */
    GetAsync(id: string)

}