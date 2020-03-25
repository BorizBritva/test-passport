export default function selectedUser(e, target) {
    let selected = Array.from(e.target.options)
      .filter(option => option.selected)
      .map(option => option.dataset.user);

      //target.editor = selected[0];
      return selected[0];;
}
