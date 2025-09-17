QUEST_TRUTH_MIA = {
	title = 'IDS_PROPQUEST_INC_001027',
	character = 'MaSa_Porgo',
	end_character = 'MaSa_SainMayor',
	start_requirements = {
		min_level = 20,
		max_level = 30,
		job = { 'JOB_MERCENARY', 'JOB_ACROBAT', 'JOB_ASSIST', 'JOB_MAGICIAN' },
		previous_quest = 'QUEST_LOST_CHILD',
	},
	rewards = {
		gold = 0,
		exp = 412,
		items = {
			{ id = 'II_SYS_SYS_QUE_SECDIS', quantity = 1, sex = 'Any' },
		},
	},
	end_conditions = {
	},
	dialogs = {
		begin = {
			'IDS_PROPQUEST_INC_001028',
			'IDS_PROPQUEST_INC_001029',
			'IDS_PROPQUEST_INC_001030',
			'IDS_PROPQUEST_INC_001031',
		},
		begin_yes = {
			'IDS_PROPQUEST_INC_001032',
		},
		begin_no = {
			'IDS_PROPQUEST_INC_001033',
		},
		completed = {
			'IDS_PROPQUEST_INC_001034',
		},
		not_finished = {
			'IDS_PROPQUEST_INC_001035',
		},
	}
}
