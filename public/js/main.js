/* Make atom shut his mouth about not defining "$" */
var $ = $

/* Define how to handle the sidebar on mobile devices */
$(document).ready(function () {
  $('.button-collapse').sideNav()
})

/* Define  */
$(function () {
  $('#tagsInput').materialize_autocomplete({
    multiple: {
      enable: true,
      onExist: function (item) {
        Materialize.toast('Tag: ' + item.text + ' is already added!', 2000)
      }
    },
    appender: {
      el: '.ac-tags',
      tagTemplate: '<div class="chip" data-id="<%= item.id %>" data-text="<%= item.text %>"><%= item.text %><i class="material-icons close">close</i></div>'
    },
    dropdown: {
      el: '#tagsDropdown',
      itemTemplate: '<li class="ac-item" data-id="<%= item.id %>" data-text="<%= item.text %>"><a href="javascript:void(0)"><%= item.text %> &#8213; <i class="ac-description"><%= item.description %></i></a></li>'
    },
    getData: function (value, callback) {
      console.log('Calling autocomplete for tag ', value)
      $.ajax({
        type: 'GET',
        url: '/api/autocomplete/' + value
      })
      .done(function (data) {
        console.log('Got this autocomplete data :', JSON.stringify(data))
        callback(value, data)
      })
      .fail(function (err) {
        console.log('Failed to get autocomplete data :', err)
      })
    }
  })
})
