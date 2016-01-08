# Angular Fuzzytime
A jQuery-free verison of the popular 'TimeAgo' plugin, configured as an AngularJS filter.

##Installation
###Step 1
Bower:  `bower install angular-fuzzytime` <br/>
Old school:  Include `fuzzytime.js` in your index.html

###Step 2
Include `fuzzy-time` in your AngularJS modules.<br/>
`angular.module('myApp', ['fuzzy-time'])`

##Usage

###Structure
`{{myVar | fuzzytime: prefix : suffix : capitalize}}`

###Examples
`{{someDate | fuzzytime}}`
Will render a string like: **"updated 3 weeks ago"**

`{{someDate | fuzzytime:'posted':'prior':true}}`
Will render a string like: **"Posted 3 weeks prior"**

###Defaults & configuration
| Property          | Type     | Default    |
| ------------------|-------| ----------|
| `prefix`          | string   | 'updated'  |
| `suffix`          | string   | 'ago'      |
| `capitalize`      | boolean  | false    |


##Notes
* Only renders past dates, does not render future dates as of yet.
* Only tested with MySQL datetime input:  eg. `2016-01-07 22:15:36`.  Other date types will *probably* work, but I haven't tried yet.
