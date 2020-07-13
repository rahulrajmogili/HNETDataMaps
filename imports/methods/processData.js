import fs from 'fs-extra';
import { Meteor } from 'meteor/meteor';
import { logger } from 'meteor/votercircle:winston';
import { moment } from 'meteor/momentjs:moment';

import { readFile } from './commonFunctions';

export const reimportLiveData = function reimportLiveData(incomingFolder, selectedDate, selectedType) {
  // get short site name from incoming folder
  const siteGroup = incomingFolder.split(/[_]+/)[0];
  const shortSiteName = incomingFolder.split(/[_]+/)[1];
  let path;

  switch (selectedType) {
    case 'LoggerNet(met)':
      if (siteGroup !== 'BC2') {
        path = `/hnet/incoming/current/${incomingFolder}/${siteGroup}_${shortSiteName}_TCEQmet_${moment(selectedDate, 'MM/DD/YYYY').format('YYMMDD')}.txt`;
      } else {
        path = `/hnet/incoming/current/${incomingFolder}/${siteGroup}_${shortSiteName}_met_${moment(selectedDate, 'MM/DD/YYYY').format('YYMMDD')}.txt`;
      }
      break;
    case 'TAP':
      path = `/hnet/incoming/current/${incomingFolder}/${siteGroup}_${shortSiteName}_tap_${moment(selectedDate, 'MM/DD/YYYY').format('YYMMDD')}.txt`;
      break;
    default: {
      if (siteGroup !== 'BC2') {
        path = `/hnet/incoming/current/${incomingFolder}/${siteGroup}_${shortSiteName}_TCEQ_${moment(selectedDate, 'MM/DD/YYYY').format('YYMMDD')}.txt`;
      } else {
        path = `/hnet/incoming/current/${incomingFolder}/${siteGroup}_${shortSiteName}_${moment(selectedDate, 'MM/DD/YYYY').format('YYMMDD')}.txt`;
      }
    }
  }

  if (!fs.existsSync(path)) {
    logger.error('Error in call for reimportLiveData.', `Could not find data file for ${selectedDate} and site ${shortSiteName}.`);
    throw new Meteor.Error('File does not exists.', `Could not find data file for ${selectedDate} and site ${shortSiteName}.`);
  }

  readFile(path);
  return `started reimport data at path ${path}`;
};
