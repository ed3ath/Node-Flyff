QUEST_TRUTH_PAST = {
	title = 'IDS_PROPQUEST_INC_001049',
	character = 'MaSa_Porgo',
	end_character = 'MaSa_Porgo',
	start_requirements = {
		min_level = 20,
		max_level = 30,
		job = { 'JOB_MERCENARY', 'JOB_ACROBAT', 'JOB_ASSIST', 'JOB_MAGICIAN' },
		previous_quest = 'QUEST_DOLL_MIA',
	},
	rewards = {
		gold = 0,
		exp = 1305,
	},
	end_conditions = {
		items = {
			{ id = 'II_SYS_SYS_QUE_TRUDIS', quantity = 1, sex = 'Any', remove = true },
		},
	},
	dialogs = {
		begin = {
			'IDS_PROPQUEST_INC_001050',
			'IDS_PROPQUEST_INC_001051',
			'IDS_PROPQUEST_INC_001052',
			'IDS_PROPQUEST_INC_001053',
			'IDS_PROPQUEST_INC_001054',
		},
		begin_yes = {
			'IDS_PROPQUEST_INC_001055',
		},
		begin_no = {
			'IDS_PROPQUEST_INC_001056',
		},
		completed = {
			'IDS_PROPQUEST_INC_001057',
		},
		not_finished = {
			'IDS_PROPQUEST_INC_001058',
		},
	}
}
