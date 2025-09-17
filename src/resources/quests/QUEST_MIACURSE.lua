QUEST_MIACURSE = {
	title = 'IDS_PROPQUEST_INC_001119',
	character = 'MaSa_SainMayor',
	end_character = 'MaSa_Porgo',
	start_requirements = {
		min_level = 20,
		max_level = 40,
		job = { 'JOB_MERCENARY', 'JOB_ACROBAT', 'JOB_ASSIST', 'JOB_MAGICIAN' },
		previous_quest = 'QUEST_SECDEAL',
	},
	rewards = {
		gold = 32000,
		exp = 0,
	},
	end_conditions = {
	},
	dialogs = {
		begin = {
			'IDS_PROPQUEST_INC_001120',
			'IDS_PROPQUEST_INC_001121',
		},
		begin_yes = {
			'IDS_PROPQUEST_INC_001122',
		},
		begin_no = {
			'IDS_PROPQUEST_INC_001123',
		},
		completed = {
			'IDS_PROPQUEST_INC_001124',
			'IDS_PROPQUEST_INC_001125',
		},
		not_finished = {
			'IDS_PROPQUEST_INC_001126',
		},
	}
}
