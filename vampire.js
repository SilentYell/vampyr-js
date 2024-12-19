class Vampire {
  constructor(name, yearConverted) {
    this.name = name;
    this.yearConverted = yearConverted;
    this.offspring = [];
    this.creator = null;
  }

  /** 
   * Simple tree methods 
   **/

  // Adds the vampire as an offspring of this vampire
  addOffspring(vampire) {
    vampire.creator = this;
    this.offspring.push(vampire);
  }

  // Returns the total number of vampires created by that vampire
  get numberOfOffspring() {
    return this.offspring.length;
  }

  // Returns the number of vampires away from the original vampire this vampire is
  get numberOfVampiresFromOriginal() {
    let numberOfVampires = 0;
    let currentVampire = this;

    while (currentVampire.creator) {
      numberOfVampires++;
      currentVampire = currentVampire.creator;
    }

    return numberOfVampires;
  }

  // Returns true if this vampire is more senior than the other vampire. (Who is closer to the original vampire)
  isMoreSeniorThan(vampire) {
    return this.numberOfVampiresFromOriginal < vampire.numberOfVampiresFromOriginal;
  }

  /**
   * Stretch 
   **/

  // Returns the closest common ancestor of two vampires.
  // The closest common ancestor should be the more senior vampire if a direct ancestor is used.
  closestCommonAncestor(vampire) {
    const thisAncestors = [];
    let currentVampire = this;

    // Step 1: Record the entire lineage for this vampire
    while (currentVampire) {
      thisAncestors.push(currentVampire);
      currentVampire = currentVampire.creator;
    }

    // Step 2: Walk the lineage of the other vampire until we find a match
    currentVampire = vampire;
    while (currentVampire) {
      if (thisAncestors.includes(currentVampire)) {
        return currentVampire;
      }
      currentVampire = currentVampire.creator;
    }

    return null; // If no common ancestor is found (shouldn't happen with a connected tree)
  }

  /**
   * Recursive traversal methods
   **/

  // Returns the vampire object with that name, or null if no vampire exists with that name
  vampireWithName(name) {
    if (this.name === name) {
      return this;
    }

    for (const child of this.offspring) {
      const result = child.vampireWithName(name);
      if (result) {
        return result;
      }
    }

    return null;
  }

  // Returns the total number of vampires that exist
  get totalDescendents() {
    let count = 0;

    for (const child of this.offspring) {
      count += 1 + child.totalDescendents; // +1 for the child, plus all of their descendents
    }

    return count;
  }

  // Returns an array of all the vampires that were converted after 1980
  get allMillennialVampires() {
    let millennials = [];

    if (this.yearConverted > 1980) {
      millennials.push(this);
    }

    for (const child of this.offspring) {
      millennials = millennials.concat(child.allMillennialVampires);
    }

    return millennials;
  }
}

module.exports = Vampire;
