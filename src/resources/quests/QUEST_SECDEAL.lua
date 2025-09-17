QUEST_SECDEAL = {
	title = 'IDS_PROPQUEST_INC_001107',
	character = 'MaSa_Porgo',
	end_character = 'MaSa_SainMayor',
	start_requirements = {
		min_level = 20,
		max_level = 40,
		job = { 'JOB_MERCENARY', 'JOB_ACROBAT', 'JOB_ASSIST', 'JOB_MAGICIAN' },
		previous_quest = 'QUEST_SPECHILD',
	},
	rewards = {
		gold = 0,
		exp = 0,
		items = {
			{ id = 'II_GEN_JEW_NEC_HPNECKLACE', quantity = 1, sex = 'Any', refine = 3 },
		},
	},
	end_conditions = {
		items = {
			{ id = 'II_SYS_SYS_QUE_PRFMISS', quantity = 1, sex = 'Any', remove = true },
		},
	},
	dialogs = {
		begin = {
			'IDS_PROPQUEST_INC_001108',
			'IDS_PROPQUEST_INC_001109',
			'IDS_PROPQUEST_INC_001110',
			'IDS_PROPQUEST_INC_001112',
		},
		begin_yes = {
			'IDS_PROPQUEST_INC_001113',
		},
		begin_no = {
			'IDS_PROPQUEST_INC_001114',
		},
		completed = {
			'IDS_PROPQUEST_INC_001115',
		},
		not_finished = {
			'IDS_PROPQUEST_INC_001116',
		},
	}
}
