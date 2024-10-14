/*
HOW TO TEST

npm test -- test/1*.js  # will run file test/1_addOffspring.js only
npm test -- test/2*.js  # will run file test/2_numberOfOffspring.js only
 */


class Vampire {
  constructor(name, yearConverted) {
    this.name = name;
    this.yearConverted = yearConverted;
    this.offspring = [];
    this.creator = null;
  }
  
  /** Simple tree methods **/
  
  // Adds the vampire as an offspring of this vampire
  addOffspring(vampire) {
    this.offspring.push(vampire);
    vampire.creator = this;
  }
  
  // Returns the total number of vampires created by that vampire
  get numberOfOffspring() {
    return this.offspring.length;
  }
  
  // Returns the number of vampires away from the original vampire this vampire is
  get numberOfVampiresFromOriginal() {
    let num = 0;
    let currentVampire = this;
    while (currentVampire.creator) {
      num++;
      currentVampire = currentVampire.creator;
    }
    return num;
  }
  
  // Returns true if this vampire is more senior than the other vampire. (Who is closer to the original vampire)
  isMoreSeniorThan(vampire) {
    return this.numberOfVampiresFromOriginal < vampire.numberOfVampiresFromOriginal
  }
  
  /** Stretch **/
  
  // Returns the closest common ancestor of two vampires.
  // The closest common anscestor should be the more senior vampire if a direct ancestor is used.
  // For example:
  // * when comparing Ansel and Sarah, Ansel is the closest common anscestor.
  // * when comparing Ansel and Andrew, Ansel is the closest common anscestor.
  closestCommonAncestor(vampire) {
    let thisAncestors = [];
    let currentVampire = this;
    
    // Collect all ancestors of the current vampire
    while (currentVampire) {
      thisAncestors.push(currentVampire);
      currentVampire = currentVampire.creator;
    }
    
    currentVampire = vampire;
    
    // Traverse the ancestors of the other vampire and find the first common ancestor
    while (currentVampire) {
      if (thisAncestors.includes(currentVampire)) {
        return currentVampire;
      }
      currentVampire = currentVampire.creator;
    }
    
    return null; // In case there is no common ancestor, which shouldn't happen in a valid tree
  }
}


module.exports = Vampire;


