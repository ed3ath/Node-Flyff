QUEST_FIND_DNAWAG = {
	title = 'IDS_PROPQUEST_INC_000957',
	character = 'MaSa_Heltung',
	end_character = 'MaSa_Heltung',
	start_requirements = {
		min_level = 20,
		max_level = 25,
		job = { 'JOB_MERCENARY', 'JOB_ACROBAT', 'JOB_ASSIST', 'JOB_MAGICIAN' },
		previous_quest = 'QUEST_FIND_BONEWAG',
	},
	rewards = {
		gold = 0,
		exp = 824,
	},
	end_conditions = {
		items = {
			{ id = 'II_SYS_SYS_QUE_DNAWAG', quantity = 10, sex = 'Any', remove = true },
		},
	},
	drops = {
		{
			item_id = 'II_SYS_SYS_QUE_DNAWAG',
			probability = '750000000',
			monsters = {
				'MI_WAGSAAC1',
				'MI_WAGSAAC2',
				'MI_WAGSAAC3',
				'MI_WAGSAAC4'
			}
		},
	},
	dialogs = {
		begin = {
			'IDS_PROPQUEST_INC_000958',
			'IDS_PROPQUEST_INC_000959',
		},
		begin_yes = {
			'IDS_PROPQUEST_INC_000960',
		},
		begin_no = {
			'IDS_PROPQUEST_INC_000961',
		},
		completed = {
			'IDS_PROPQUEST_INC_000962',
		},
		not_finished = {
			'IDS_PROPQUEST_INC_000963',
		},
	}
}
